import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Navbar.css";
import Hamburger from "hamburger-react";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const currentUser = useAuth();

  const handleOnToggle = () => {
    setIconIsActive((prevState) => !prevState);
  };

  const handleSignout = () => {
    localStorage.removeItem("token");
    document.location.reload();
  };

  const [iconIsActive, setIconIsActive] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <span>
            <NavLink className="logo-link" to="/">
              Alcocards
            </NavLink>
          </span>

          <span className="hamburger-span">
            <Hamburger onToggle={handleOnToggle} toggled={iconIsActive} />
          </span>
        </div>

        <ul className={iconIsActive ? "navbar-list showed" : "navbar-list"}>
          <NavbarListItem
            destination={"cards"}
            name={"Moje karty"}
            collapse={handleOnToggle}
          />
          <NavbarListItem
            destination={"offer"}
            name={"Oferta"}
            collapse={handleOnToggle}
          />

          {currentUser?.currentUser?.isLoggedIn ? (
            <li className="navbar-link" onClick={handleSignout}>
              Wyloguj
            </li>
          ) : (
            <NavbarListItem
              name={"Zaloguj"}
              destination={"login"}
              collapse={handleOnToggle}
            />
          )}
        </ul>
      </nav>
      <div className="navbar-separator"></div>

      <Outlet />
    </>
  );
};

interface IListItemProps {
  name: String;
  destination: String;
  collapse: () => void;
}

const NavbarListItem = ({ name, destination, collapse }: IListItemProps) => {
  return (
    <li
      onClick={() => {
        collapse();
      }}
    >
      <NavLink className="navbar-link" to={`/${destination}`}>
        {name}
      </NavLink>
    </li>
  );
};

export default Navbar;
