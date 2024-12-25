import { Buttons } from "Components/Buttons";
import { Card } from "Components/Card";
import { Snow } from "Components/Snow";
import { CardContextProvider } from "State/CardContext";
import "./styles.scss";

export function App() {
  return (
    <CardContextProvider>
      <div className="container">
        <Snow ID="snowFall" />
        <Buttons />
        <Card />
      </div>
    </CardContextProvider>
  );
}
