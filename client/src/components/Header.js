import "./Header.css";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <p className="header-title">🏘️ House Tricks</p>
        <ul className="header-nav">
          <li className="header-nav-item">
            <Link to="/">Properties</Link>
          </li>
          <li className="header-nav-item">
            <Link to="/add">Add property</Link>
          </li>
          <li className="header-nav-item">
            <LoginButton />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
