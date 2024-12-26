import BGLarge from "Images/background.webp";
import BGSmall from "Images/background-small.webp";
import { Card } from "State/Card";

export class Preloader {
  public static preload() {
    return Promise.allSettled([this.minTimeout(), this.preloadBG()]).then(
      () => {
        Card.initialize();
      },
    );
  }

  private static preloadBG() {
    return new Promise<void>((resolve) => {
      const img = new Image();
      const onLoad = () => {
        resolve();
      };
      img.onload = onLoad;
      img.onerror = onLoad;
      if (window.innerWidth <= 670) {
        img.src = BGSmall;
      } else {
        img.src = BGLarge;
      }
    });
  }

  private static minTimeout() {
    return new Promise((resolve) => setTimeout(resolve, 2500));
  }
}
