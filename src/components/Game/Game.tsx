import { useState, useEffect, createRef, useRef } from "react";
import { handleTouchMove, handleTouchStart } from "../../utils/SwipeListener";
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

  const rightSwipe = () => {
    if (nextCard === itemsRef.current.length) {
      return;
    }
    setPrevCard((prevState) => prevState + 1);
    setCurrentCard((prevState) => prevState + 1);
    setNextCard((prevState) => prevState + 1);

    itemsRef.current[prevCard]?.classList.replace("prev", "hidden-after");
    itemsRef.current[currentCard]?.classList.replace("current", "prev");
    itemsRef.current[nextCard]?.classList.replace("next", "current");
    itemsRef.current[nextCard + 1]?.classList.replace("hidden", "next");
    console.log(prevCard, currentCard, nextCard);
  };

  const leftSwipe = () => {
    if (prevCard === -2) {
      return;
    }
    setPrevCard((prevState) => prevState - 1);
    setCurrentCard((prevState) => prevState - 1);
    setNextCard((prevState) => prevState - 1);

    itemsRef.current[prevCard]?.classList.replace("hidden-after", "prev");
    itemsRef.current[currentCard]?.classList.replace("prev", "current");
    itemsRef.current[nextCard]?.classList.replace("current", "next");
    itemsRef.current[nextCard + 1]?.classList.replace("next", "hidden");

    console.log(prevCard, currentCard, nextCard);
  };

  return (
    <section
      style={{
        background: "var(--bg-color)",
      }}
    >
      <div className="mh game-section">
        <div
          className="cards-container"
          onTouchStart={handleTouchStart}
          onTouchMove={(e) => {
            handleTouchMove(e, rightSwipe, leftSwipe);
          }}
        >
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
            rightSwipe();
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
