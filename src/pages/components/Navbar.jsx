import { Link, useNavigate } from "react-router-dom";
import applogo from "../public/logos/applogo.jpg";
import "../styles/navbar.css";

function Navbar() {

  const navigate = useNavigate();
  const workerId = localStorage.getItem("workerId");

  const handleLogout = () => {
    localStorage.removeItem("workerId");
    navigate("/");
  };

  return (

    <nav className="navbar">

      <div className="nav-left">

        <img src={applogo} alt="GigShield" className="logo" />

        <span className="brand">GigShield AI</span>

      </div>

      <ul className="nav-links">

        {!workerId && (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/login">Worker Login</Link>
            </li>

            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}

        {workerId && (
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}

      </ul>

    </nav>

  );
}

export default Navbar;
