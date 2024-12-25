import { memo, useContext } from "react";
import { useClassNames } from "@figliolia/classnames";
import { CardContext } from "State/CardContext";
import type { Propless } from "Types/React";
import "./styles.scss";

export const Buttons = memo(
  function Buttons(_: Propless) {
    const { name, select } = useContext(CardContext);
    const classes = useClassNames("names", { selected: !!name });
    return (
      <div className={classes}>
        <button onClick={select} data-name="george">
          George
        </button>
        <button onClick={select} data-name="dana">
          Dana
        </button>
        <button onClick={select} data-name="steveandjen">
          Steve and Jen
        </button>
        <button onClick={select} data-name="erica">
          Erica
        </button>
      </div>
    );
  },
  () => true,
);
