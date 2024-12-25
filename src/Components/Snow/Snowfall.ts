export class Snowfall {
  canvasID: string;
  program?: WebGLProgram;
  canvas: HTMLCanvasElement;
  context: WebGLRenderingContext;
  private snowflakeCount = 200;
  private positionBuffer?: WebGLBuffer;
  private currentFrame: number | null = null;
  private positions = new Float32Array(this.snowflakeCount * 2);
  private sizes = new Float32Array(this.snowflakeCount);
  private speeds = new Float32Array(this.snowflakeCount);
  private drift = new Float32Array(this.snowflakeCount);
  constructor(canvasID: string) {
    this.canvasID = canvasID;
    this.canvas = Snowfall.guard(
      document.getElementById(this.canvasID) as HTMLCanvasElement | null,
      "Cannot find canvas",
    );
    this.context = Snowfall.guard(
      this.canvas.getContext("webgl"),
      "WebGL Unavailable",
    );
  }

  public initialize() {
    this.resize();
    window.addEventListener("resize", this.resize);
    this.createShaders();
    this.initializeDrops();
    this.moveToGPU();
    this.animate();
  }

  public destroy() {
    window.removeEventListener("resize", this.resize);
    if (this.currentFrame) {
      cancelAnimationFrame(this.currentFrame);
    }
  }

  public resize = () => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context.viewport(0, 0, this.canvas.width, this.canvas.height);
  };

  private createShaders() {
    const vertexShader = this.compileShader(
      Snowfall.vertexShaderSource,
      this.context.VERTEX_SHADER,
    );
    const fragmentShader = this.compileShader(
      Snowfall.fragmentShaderSource,
      this.context.FRAGMENT_SHADER,
    );
    this.program = this.context.createProgram() as unknown as WebGLProgram;
    this.context.attachShader(this.program, vertexShader);
    this.context.attachShader(this.program, fragmentShader);
    this.context.linkProgram(this.program);
    if (
      !this.context.getProgramParameter(this.program, this.context.LINK_STATUS)
    ) {
      console.error(this.context.getProgramInfoLog(this.program));
    }
    this.context.useProgram(this.program);
  }

  private initializeDrops() {
    for (let i = 0; i < this.snowflakeCount; i++) {
      this.positions[i * 2] = Math.random() * 2 - 1; // x: [-1, 1]
      this.positions[i * 2 + 1] = Math.random() * 2 - 1; // y: [-1, 1]
      this.sizes[i] = Math.random() * 4 + 2; // size: [2, 6]
      this.speeds[i] = Math.random() * 0.02 + 0.001; // speed: [0.01, 0.03]
      this.drift[i] = (Math.random() - 0.5) * 0.002; // horizontal drift
    }
  }

  private moveToGPU() {
    this.positionBuffer = this.context.createBuffer()!;
    this.context.bindBuffer(this.context.ARRAY_BUFFER, this.positionBuffer);
    this.context.bufferData(
      this.context.ARRAY_BUFFER,
      this.positions,
      this.context.DYNAMIC_DRAW,
    );
    const program = Snowfall.guard(this.program);
    const positionLocation = this.context.getAttribLocation(
      program,
      "a_position",
    );
    this.context.enableVertexAttribArray(positionLocation);
    this.context.vertexAttribPointer(
      positionLocation,
      2,
      this.context.FLOAT,
      false,
      0,
      0,
    );

    const sizeBuffer = this.context.createBuffer();
    this.context.bindBuffer(this.context.ARRAY_BUFFER, sizeBuffer);
    this.context.bufferData(
      this.context.ARRAY_BUFFER,
      this.sizes,
      this.context.STATIC_DRAW,
    );

    const sizeLocation = this.context.getAttribLocation(program, "a_size");
    this.context.enableVertexAttribArray(sizeLocation);
    this.context.vertexAttribPointer(
      sizeLocation,
      1,
      this.context.FLOAT,
      false,
      0,
      0,
    );
  }

  private animate() {
    this.randomizePositions();
    const positionBuffer = Snowfall.guard(this.positionBuffer);
    this.context.bindBuffer(this.context.ARRAY_BUFFER, positionBuffer);
    this.context.bufferSubData(this.context.ARRAY_BUFFER, 0, this.positions);
    this.context.clear(this.context.COLOR_BUFFER_BIT);
    this.context.drawArrays(this.context.POINTS, 0, this.snowflakeCount);
    this.currentFrame = requestAnimationFrame(() => this.animate());
  }

  private randomizePositions() {
    for (let i = 0; i < this.snowflakeCount; i++) {
      this.positions[i * 2 + 1] -= this.speeds[i]; // Move down by speed
      this.positions[i * 2] += this.drift[i]; // Add horizontal drift

      if (this.positions[i * 2 + 1] < -1) {
        this.positions[i * 2 + 1] = 1; // Reset snowflake to top
        this.positions[i * 2] = Math.random() * 2 - 1; // Randomize x position
      }

      if (this.positions[i * 2] < -1 || this.positions[i * 2] > 1) {
        this.positions[i * 2] = Math.random() * 2 - 1; // Wrap x position
      }
    }
  }

  private compileShader(source: string, type: GLenum) {
    const shader = this.context.createShader(type) as WebGLShader;
    this.context.shaderSource(shader, source);
    this.context.compileShader(shader);
    if (!this.context.getShaderParameter(shader, this.context.COMPILE_STATUS)) {
      this.context.deleteShader(shader);
      throw new Error("Shader compiler error");
    }
    return shader;
  }

  private static guard<T>(
    value: T | undefined | null,
    error = "Failed to generate program requirements",
  ) {
    if (!value) {
      throw new Error(error);
    }
    return value;
  }

  public static vertexShaderSource = `
    attribute vec2 a_position;
    attribute float a_size;
    varying float v_alpha;

    void main() {
      gl_PointSize = a_size;
      gl_Position = vec4(a_position, 0.0, 1.0);

      // Alpha based on y position (fade snow as it falls)
      v_alpha = 1.0 - abs(a_position.y);
    }
`;

  public static fragmentShaderSource = `
    precision mediump float;
    varying float v_alpha;

    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) {
        discard; // Snowflake shape as a circle
      }
      gl_FragColor = vec4(1.0, 1.0, 1.0, v_alpha); // White with alpha
    }
`;
}
