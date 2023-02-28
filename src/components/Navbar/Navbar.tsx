import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Navbar.css";
import Hamburger from "hamburger-react";
import { useAuth } from "../../contexts/AuthContext";
import { MdLogout, MdShoppingCart, MdLogin } from "react-icons/md";
import { GiCardPlay } from "react-icons/gi";

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
            icon={<GiCardPlay />}
            destination={"cards"}
            name={"Moje karty"}
            collapse={handleOnToggle}
          />
          <NavbarListItem
            icon={<MdShoppingCart />}
            destination={"offer"}
            name={"Oferta"}
            collapse={handleOnToggle}
          />

          {currentUser?.currentUser?.isLoggedIn ? (
            <li className="navbar-link" onClick={handleSignout}>
              Wyloguj
              <MdLogout />
            </li>
          ) : (
            <NavbarListItem
              icon={<MdLogin />}
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
  icon: React.ReactNode;
}

const NavbarListItem = ({
  name,
  destination,
  collapse,
  icon,
}: IListItemProps) => {
  return (
    <li
      onClick={() => {
        collapse();
      }}
    >
      <NavLink className="navbar-link" to={`/${destination}`}>
        {name}
        {icon}
      </NavLink>
    </li>
  );
};

export default Navbar;
