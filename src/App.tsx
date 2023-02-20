import { Routes, Route } from "react-router-dom";
import Cards from "./components/Cards";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./utils/ProtectedRoute";

const App = (): React.ReactElement => {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route path="/" index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/cards" element={<Cards />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
