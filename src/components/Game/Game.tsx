import { useState, useEffect, createRef, useRef } from "react";
import { handleTouchMove, handleTouchStart } from "../../utils/SwipeListener";
import { MdArrowForward, MdArrowBack } from "react-icons/md";
import Footer from "../Footer/Footer";
import "./Game.css";
import { useParams } from "react-router-dom";
import { SERVER_DOMAIN } from "../../utils/Variables";
import fetchHeaders from "../../utils/Headers";
import { CircularProgress } from "@mui/material";
import drinkImage from "../../images/drink_1.png";

const Game = () => {
  const { id } = useParams();
  const [cards, setCards] = useState<{ title: String; description: String }[]>(
    []
  );
  const [currentCard, setCurrentCard] = useState(0);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getItemsRef = () => {
    itemsRef.current = itemsRef.current.slice(0, cards.length);
    itemsRef.current[currentCard]?.classList.replace("hidden", "current");
    itemsRef.current[currentCard + 1]?.classList.replace("hidden", "next");
  };

  useEffect(() => {
    fetch(`${SERVER_DOMAIN}/api/cards/game/${id}`, {
      method: "GET",
      headers: fetchHeaders,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.type === "error") {
          console.log(data.message);
        } else {
          setCards(data);
        }
      })
      .then(() => {
        getItemsRef();
        console.log(itemsRef);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [isLoading]);

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
        {isLoading ? (
          <CircularProgress />
        ) : (
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
                  <div className="gamecard-container">
                    <h3 className="gamecard-title">{card.title}</h3>
                    <h4 className="gamecard-description">{card.description}</h4>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: "2",
                      filter: "opacity(.4)",
                    }}
                  >
                    <img
                      src={drinkImage}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
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
        )}
      </div>

      <Footer />
    </section>
  );
};

export default Game;
