import type { MouseEvent } from "react";
import { useCallback, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Snow } from "Components/Snow";
import { CARDS } from "./Cards";
import "Styles/Reset.scss";
import "./styles.scss";

export function App() {
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const classes = useClassNames("names", { selected: !!name });
  const cardClasses = useClassNames("card", { active: !!name });

  const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setName(target.dataset.name!);
    // @ts-ignore
    setCard(CARDS[target.dataset.name!]);
  }, []);

  const onBack = useCallback(() => {
    setName("");
    setTimeout(() => {
      setCard("");
    }, 1000);
  }, []);

  return (
    <div className="container">
      <Snow ID="snowFall" />
      <div className={classes}>
        <button onClick={onClick} data-name="george">
          George
        </button>
        <button onClick={onClick} data-name="dana">
          Dana
        </button>
        <button onClick={onClick} data-name="steveandjen">
          Steve and Jen
        </button>
        <button onClick={onClick} data-name="erica">
          Erica
        </button>
      </div>
      <div className={cardClasses}>
        <div>
          <p>{card}</p>
          <button onClick={onBack}>back</button>
        </div>
      </div>
    </div>
  );
}

export default App;
