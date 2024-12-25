import type { MouseEvent } from "react";
import { createContext, memo, useCallback, useMemo, useState } from "react";
import type { OptionalChildren } from "Types/React";
import { CARDS, matchesCard } from "./Cards";

export const CardContext = createContext({
  card: "",
  name: "",
  goBack: () => {},
  select: (_: MouseEvent<HTMLButtonElement>) => {},
});

export const CardContextProvider = memo(function CardContextProvider({
  children,
}: OptionalChildren) {
  const [name, setName] = useState("");
  const [card, setCard] = useState("");

  const select = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const { name } = target.dataset;
    if (name && matchesCard(name)) {
      setName(name);
      setCard(CARDS[name]);
    }
  }, []);

  const goBack = useCallback(() => {
    setName("");
    setTimeout(() => {
      setCard("");
    }, 2000);
  }, []);

  const contextValue = useMemo(
    () => ({ name, card, select, goBack }),
    [name, card, select, goBack],
  );

  return (
    <CardContext.Provider value={contextValue}>{children}</CardContext.Provider>
  );
});
