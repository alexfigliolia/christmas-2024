import { useClassNames } from "@figliolia/classnames";
import { Buttons } from "Components/Buttons";
import { Card } from "Components/Card";
import { Snow } from "Components/Snow";
import { loading, useCard } from "State/Card";
import "./styles.scss";

export function App() {
  const isLoading = useCard(loading);
  const classes = useClassNames("container", { isLoading });
  return (
    <div className={classes}>
      <Snow ID="snowFall" />
      <Buttons />
      <Card />
    </div>
  );
}
