import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import loginPhoto from "../public/logos/logphoto.jpg";
import "../styles/login.css";

function WorkerLogin() {

  const [phone, setPhone] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [message, setMessage] = useState("");

  const [showLogin, setShowLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:8085/api/workers/login",
        {
          phone: phone,
          aadhaar: aadhaar
        }
      );

      localStorage.setItem("workerId", response.data.id);

      navigate("/worker/dashboard");

    } catch (error) {

      setMessage("Invalid phone or Aadhaar");

    }
  };

  return (

    <>
      {!showLogin && (

        <div className="animation-screen">

          <img
            src={loginPhoto}
            alt="delivery"
            className="delivery-animation"
          />

          <h1 className="app-title">GigShield</h1>

        </div>

      )}

      {showLogin && (

        <>
          <Navbar />

          <div className="login-wrapper">

            <div className="login-card fade-in">

              <div className="login-left">
                <h2>Welcome Worker 👷</h2>
                <p>
                  Login to access your policies, payments and worker dashboard.
                </p>
              </div>

              <div className="login-right">

                <h3>Worker Login</h3>

                <form onSubmit={handleSubmit}>

                  <div className="input-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Aadhaar Number</label>
                    <input
                      type="text"
                      placeholder="Enter Aadhaar number"
                      value={aadhaar}
                      onChange={(e) => setAadhaar(e.target.value)}
                      required
                    />
                  </div>

                  <button className="login-btn">
                    Login
                  </button>

                </form>

                {message && <p className="login-message">{message}</p>}

              </div>

            </div>

          </div>

        </>
      )}

    </>
  );
}

export default WorkerLogin;