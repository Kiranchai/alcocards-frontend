import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import IProduct from "../../interfaces/IProduct";
import fetchHeaders from "../../utils/Headers";
import { SERVER_DOMAIN } from "../../utils/Variables";
import Footer from "../Footer/Footer";
import "./Offer.css";

const Offer = () => {
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${SERVER_DOMAIN}/api/cards/getProducts`, {
      method: "GET",
      headers: fetchHeaders,
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="offer">
        <section className="mh offer-section">
          <h2 className="offer-header">Oferta</h2>
          {isLoading ? (
            <CircularProgress className="loading-anim" />
          ) : (
            <div className="offer-products">
              {products &&
                products.map((product) => {
                  return (
                    <div
                      className="offer-single-product"
                      key={product.pubId as React.Key}
                    >
                      <NavLink
                        className="offer-inner-wrapper"
                        to={`/offer/${product.pubId}`}
                        key={product.pubId as React.Key}
                      >
                        <div className="offer-image-wrapper"></div>
                        <div className="offer-description-container">
                          {" "}
                          {product.name}
                          <span>{product.price} zł</span>
                        </div>
                      </NavLink>
                    </div>
                  );
                })}
            </div>
          )}
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Offer;
