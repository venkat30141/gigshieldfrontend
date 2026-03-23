import { Link, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

function WorkerSidebar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("workerId");
    navigate("/login");
  };

  return (

    <div className="sidebar">

      <h2 className="logo">GigShield</h2>

      <nav>

        <Link to="/worker/dashboard">Dashboard</Link>

        <Link to="/worker/policies">Policies</Link>

        <Link to="/worker/claims">Claims</Link>

        <Link to="/worker/payments">Payments</Link>

        <Link to="/worker/risk">Risk Alerts</Link>

        <button onClick={logout} className="logout">
          Logout
        </button>

      </nav>

    </div>

  );

}

export default WorkerSidebar;