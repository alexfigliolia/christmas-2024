import { memo, useContext } from "react";
import { useClassNames } from "@figliolia/classnames";
import { CardContext } from "State/CardContext";
import type { Propless } from "Types/React";
import "./styles.scss";

export const Card = memo(
  function Card(_: Propless) {
    const { name, card, goBack } = useContext(CardContext);
    const cardClasses = useClassNames("card", { active: !!name });
    return (
      <div className={cardClasses}>
        <div>
          <p>{card}</p>
          <button onClick={goBack}>back</button>
        </div>
      </div>
    );
  },
  () => true,
);
