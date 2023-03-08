import { useEffect, useState } from "react";
import fetchHeaders from "../../utils/Headers";
import { SERVER_DOMAIN } from "../../utils/Variables";
import IProduct from "../../interfaces/IProduct";
import "./MyCards.css";
import Footer from "../Footer/Footer";
import { CircularProgress } from "@mui/material";
import { NavLink } from "react-router-dom";

const MyCards = () => {
  const [cards, setCards] = useState<Array<IProduct> | null>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div style={{ background: "var(--bg-color)" }}>
      <section className="mh mycards-section">
        <h2 className="mycards-header">Moje karty</h2>

        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {cards?.length === 0 ? (
              <div className="mycards-empty-container">
                <header className="mycards-empty-header">
                  Aktualnie nie posiadasz żadnych kart
                </header>
                <span className="mycards-empty-span">
                  Znajdź coś dla siebie
                </span>
                <NavLink to={"/offer"} className="mycards-empty-button">
                  Nasza oferta
                </NavLink>
              </div>
            ) : (
              <>
                <div className="mycards-container">
                  {cards &&
                    cards.map((card) => {
                      return (
                        <NavLink
                          to={`/cards/${card.pubId}`}
                          className="mycards-card"
                          key={card._id as React.Key}
                        >
                          <span className="mycards-card-span">{card.name}</span>
                        </NavLink>
                      );
                    })}
                </div>
              </>
            )}
          </>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default MyCards;
