import { useState, useEffect, createRef, useRef } from "react";
import Footer from "../Footer/Footer";
import "./Game.css";

const Game = () => {
  const [cards, setCards] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [currentCard, setCurrentCard] = useState(0);
  const [prevCard, setPrevCard] = useState(-1);
  const [nextCard, setNextCard] = useState(1);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, cards.length);

    itemsRef.current[currentCard]?.classList.replace("hidden", "current");
    itemsRef.current[nextCard]?.classList.replace("hidden", "next");
  }, []);

  return (
    <section
      style={{
        background: "var(--bg-color)",
      }}
    >
      <div className="mh game-section">
        <div className="cards-container">
          {cards.map((card, i) => {
            return (
              <div
                className="card hidden"
                ref={(el) => (itemsRef.current[i] = el)}
                key={i}
              >
                {card}
              </div>
            );
          })}
        </div>
        <button
          style={{ marginTop: "800px" }}
          onClick={() => {
            if (nextCard === itemsRef.current.length) {
              return console.log("now");
            }
            setPrevCard((prevState) => prevState + 1);
            setCurrentCard((prevState) => prevState + 1);
            setNextCard((prevState) => prevState + 1);

            itemsRef.current[prevCard]?.classList.replace(
              "prev",
              "hidden-after"
            );
            itemsRef.current[currentCard]?.classList.replace("current", "prev");
            itemsRef.current[nextCard]?.classList.replace("next", "current");
            itemsRef.current[nextCard + 1]?.classList.replace("hidden", "next");
          }}
        >
          halo
        </button>
      </div>

      <Footer />
    </section>
  );
};

export default Game;
