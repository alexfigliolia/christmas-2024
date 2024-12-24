import { memo, useLayoutEffect } from "react";
import { Snowfall } from "./Snowfall";

export const Snow = memo(function Snow({ ID }: Props) {
  useLayoutEffect(() => {
    const snowfall = new Snowfall(ID);
    snowfall.initialize();
    return () => {
      snowfall.destroy();
    };
  }, [ID]);
  return <canvas id={ID} />;
});

interface Props {
  ID: string;
}
