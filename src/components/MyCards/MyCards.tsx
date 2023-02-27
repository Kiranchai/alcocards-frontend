import { useEffect, useState } from "react";
import fetchHeaders from "../../utils/Headers";
import { SERVER_DOMAIN } from "../../utils/Variables";
import IProduct from "../../interfaces/IProduct";
import "./MyCards.css";

const MyCards = () => {
  const [cards, setCards] = useState<Array<IProduct> | null>([]);

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
    <section className="mh mycards-section">
      <h1>My Cards</h1>
      {cards &&
        cards.map((card) => {
          return <span key={card._id as React.Key}>{card.name}</span>;
        })}
    </section>
  );
};

export default MyCards;
