import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchHeaders from "../../utils/Headers";
import { SERVER_DOMAIN } from "../../utils/Variables";
import axios from "axios";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${SERVER_DOMAIN}/api/cards/product/${id}`, {
      method: "GET",
      headers: fetchHeaders,
    })
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      Product {id}
      <span>{product && product.name}</span>
      <span>{product && product.price}</span>
      {!!product ? (
        <button
          onClick={() => {
            axios
              .post(
                `${SERVER_DOMAIN}/api/payments/create-checkout-session`,
                {
                  item: product.stripeId,
                },
                {
                  headers: {
                    "x-access-token": localStorage.getItem("token") as string,
                  },
                }
              )
              .then((res) => {
                if (res.data.url) {
                  window.location.href = res.data.url;
                } else {
                  console.log(res);
                }
              });
          }}
        >
          Kup teraz
        </button>
      ) : (
        <span>Loading</span>
      )}
    </div>
  );
};

export default Product;
