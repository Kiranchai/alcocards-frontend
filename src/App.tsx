import { Routes, Route } from "react-router-dom";
import MyCards from "./components/MyCards/MyCards";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./utils/ProtectedRoute";
import Offer from "./components/Offer/Offer";
import Product from "./components/Product/Product";
import Register from "./components/Register/Register";
import Game from "./components/Game/Game";
import EmailVerification from "./components/EmailVerification/EmailVerification";
import PasswordRecovery from "./components/PasswordRecovery/PasswordRecovery";

const App = (): React.ReactElement => {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route path="/" index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/offer/:id" element={<Product />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/cards" element={<MyCards />} />
          <Route path="/cards/:id" element={<Game />} />
        </Route>
        <Route path="/passwordRecovery/:token" element={<PasswordRecovery />} />
      </Route>
      <Route path="/verificateEmail/:token" element={<EmailVerification />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
