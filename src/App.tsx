import { Routes, Route } from "react-router-dom";
import MyCards from "./components/MyCards";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./utils/ProtectedRoute";
import Offer from "./components/Offer/Offer";
import Product from "./components/Product/Product";

const App = (): React.ReactElement => {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route path="/" index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/offer/:id" element={<Product />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/cards" element={<MyCards />} />
        </Route>
      </Route>
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default App;
