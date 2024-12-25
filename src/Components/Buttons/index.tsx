import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Card, ready, selectActiveName, useCard } from "State/Card";
import type { Propless } from "Types/React";
import "./styles.scss";

export const Buttons = memo(
  function Buttons(_: Propless) {
    const isReady = useCard(ready);
    const name = useCard(selectActiveName);
    const classes = useClassNames("names", { selected: !!name, isReady });
    return (
      <div className={classes}>
        <button onClick={Card.select} data-name="george">
          George
        </button>
        <button onClick={Card.select} data-name="dana">
          Dana
        </button>
        <button onClick={Card.select} data-name="steveandjen">
          Steve and Jen
        </button>
        <button onClick={Card.select} data-name="erica">
          Erica
        </button>
      </div>
    );
  },
  () => true,
);
