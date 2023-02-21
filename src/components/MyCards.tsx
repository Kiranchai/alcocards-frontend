import { useEffect, useState } from "react";
import fetchHeaders from "../utils/Headers";
import { SERVER_DOMAIN } from "../utils/Variables";

const MyCards = () => {
  interface ICard {
    name: String;
  }

  const [cards, setCards] = useState<Array<ICard> | null>([]);

  useEffect(() => {
    fetch(`${SERVER_DOMAIN}/api/cards/`, {
      method: "GET",
      headers: fetchHeaders,
    })
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>My Cards</h1>
      {cards &&
        cards.map((card) => {
          return <span>{card.name}</span>;
        })}
    </div>
  );
};

export default MyCards;
