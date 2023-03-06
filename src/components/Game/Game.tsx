import { useState, useEffect, createRef, useRef } from "react";
import { handleTouchMove, handleTouchStart } from "../../utils/SwipeListener";
import { MdArrowForward, MdArrowBack } from "react-icons/md";
import Footer from "../Footer/Footer";
import "./Game.css";

const Game = () => {
  const [cards, setCards] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [currentCard, setCurrentCard] = useState(0);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

  const getItemsRef = () => {
    itemsRef.current = itemsRef.current.slice(0, cards.length);
    itemsRef.current[currentCard]?.classList.replace("hidden", "current");
    itemsRef.current[currentCard + 1]?.classList.replace("hidden", "next");
  };

  useEffect(() => {
    getItemsRef();
  }, []);

  useEffect(() => {
    const hiddenAfterRef = itemsRef.current[currentCard - 2];
    const prevCardRef = itemsRef.current[currentCard - 1];
    const currentCardRef = itemsRef.current[currentCard];
    const nextCardRef = itemsRef.current[currentCard + 1];
    const hiddenRef = itemsRef.current[currentCard + 2];

    hiddenAfterRef?.classList.replace(
      hiddenAfterRef.classList[1],
      "hidden-after"
    );
    prevCardRef?.classList.replace(prevCardRef.classList[1], "prev");
    currentCardRef?.classList.replace(currentCardRef.classList[1], "current");
    nextCardRef?.classList.replace(nextCardRef.classList[1], "next");
    hiddenRef?.classList.replace(hiddenRef.classList[1], "hidden");
  }, [currentCard]);

  const rightSwipe = () => {
    if (currentCard + 1 === itemsRef.current.length) {
      return;
    }
    setCurrentCard(currentCard + 1);
  };

  const leftSwipe = () => {
    if (currentCard - 1 === -1) {
      return;
    }
    setCurrentCard(currentCard - 1);
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
                {i === 0 ? (
                  ""
                ) : (
                  <MdArrowBack
                    className="card-switch-btn left"
                    onClick={leftSwipe}
                  />
                )}

                {i === cards.length - 1 ? (
                  ""
                ) : (
                  <MdArrowForward
                    className="card-switch-btn right"
                    onClick={rightSwipe}
                  />
                )}
              </div>
            );
          })}
        </div>
        {/* <button
          style={{ marginTop: "800px" }}
          onClick={() => {
            rightSwipe();
          }}
        >
          halo
        </button> */}
      </div>

      <Footer />
    </section>
  );
};

export default Game;
