import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import fetchHeaders from "../../utils/Headers";
import { SERVER_DOMAIN } from "../../utils/Variables";

const Offer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${SERVER_DOMAIN}/api/cards/getProducts`, {
      method: "GET",
      headers: fetchHeaders,
    })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Offer</h1>
      {products &&
        products.map((product) => {
          return <NavLink to={product._id}>{product.name}</NavLink>;
        })}
    </div>
  );
};

export default Offer;
