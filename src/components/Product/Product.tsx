import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import fetchHeaders from "../../utils/Headers";
import { SERVER_DOMAIN } from "../../utils/Variables";
import axios from "axios";
import IProduct from "../../interfaces/IProduct";
import "./Product.css";
import Footer from "../Footer/Footer";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    fetch(`${SERVER_DOMAIN}/api/cards/product/${id}`, {
      method: "GET",
      headers: fetchHeaders,
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setProduct(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div
        style={{
          background: "var(--bg-color)",
        }}
      >
        <section className="mh product-section">
          <div className="product-grid-container">
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              <>
                {product?.pubId ? (
                  <>
                    <div className="product-grid-item img-wrapper">img</div>
                    <div className="product-grid-item details">
                      <h2 className="product-title">{product.name}</h2>
                      <span className="product-price">{product.price} zł</span>
                      <p className="product-description">
                        {product.description}
                      </p>

                      <button
                        className="product-buy-btn"
                        disabled={buttonDisabled}
                        onClick={() => {
                          setButtonDisabled(true);
                          setError(null);

                          axios
                            .post(
                              `${SERVER_DOMAIN}/api/payments/create-checkout-session`,
                              {
                                item: product.stripeId,
                              },
                              {
                                headers: {
                                  "x-access-token": localStorage.getItem(
                                    "token"
                                  ) as string,
                                },
                              }
                            )
                            .then((res) => {
                              if (res.data.url) {
                                window.location.href = res.data.url;
                              } else if (res.data.type === "auth-fail") {
                                navigate("/login");
                              } else if (res.data.type === "error") {
                                setError(res.data.message);
                              } else {
                                console.log(res.data);
                              }
                            })
                            .catch((err) => {
                              console.log(err);
                            })
                            .finally(() => {
                              setButtonDisabled(false);
                            });
                        }}
                      >
                        {buttonDisabled ? "Przekierowuje..." : "Kup teraz"}
                      </button>
                      {error && (
                        <div
                          style={{
                            color: "red",
                            textShadow: "none",
                          }}
                        >
                          {error}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <Navigate to={"/offer"} />
                )}
              </>
            )}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Product;
