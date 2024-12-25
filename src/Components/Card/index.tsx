import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Card as CardState, selectActiveState, useCard } from "State/Card";
import type { Propless } from "Types/React";
import "./styles.scss";

export const Card = memo(
  function Card(_: Propless) {
    const [name, card] = useCard(selectActiveState);
    const cardClasses = useClassNames("card", { active: !!name });
    return (
      <div className={cardClasses}>
        <div>
          <p>{card}</p>
          <button onClick={CardState.goBack}>back</button>
        </div>
      </div>
    );
  },
  () => true,
);
