import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import "../styles/register.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import registerPhoto from "../public/logos/registerphoto.jpg";

function WorkerRegister() {

  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    workerId: "",
    aadhaar: "",
    pan: "",
    bankAccount: "",
    ifsc: "",
    location: "",
    deliveryZone1: "",
    deliveryZone2: "",
    dailyIncome: ""
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {

    const timer = setTimeout(() => {
      setShowForm(true);
    }, 3500);

    return () => clearTimeout(timer);

  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);

    try {

      const payload = {
        ...formData,
        dailyIncome: Number(formData.dailyIncome)
      };

      const response = await axios.post(
        "https://web-production-603af5.up.railway.app/api/workers/register",
        payload
      );

      console.log(response.data);

      setLoading(false);
      setShowSuccess(true);

      setFormData({
        fullName: "",
        phone: "",
        email: "",
        workerId: "",
        aadhaar: "",
        pan: "",
        bankAccount: "",
        ifsc: "",
        location: "",
        deliveryZone1: "",
        deliveryZone2: "",
        dailyIncome: ""
      });

      setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (error) {

      setLoading(false);
      setMessage("Registration failed");

    }

  };

  return (

    <>
      {!showForm && (

        <div className="animation-screen">

          <img
            src={registerPhoto}
            alt="register animation"
            className="register-animation"
          />

          <h1 className="app-title">GigShield</h1>

        </div>

      )}

      {showForm && (

        <div className="auth-container">

          <Navbar />

          <h2>Worker Registration</h2>

          <form onSubmit={handleSubmit} className="auth-form">

            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />

            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

            <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />

            <input type="text" name="workerId" placeholder="Platform Worker ID" value={formData.workerId} onChange={handleChange} required />

            <input type="text" name="aadhaar" placeholder="Aadhaar (12 digits)" value={formData.aadhaar} onChange={handleChange} required />

            <input type="text" name="pan" placeholder="PAN" value={formData.pan} onChange={handleChange} required />

            <input type="text" name="bankAccount" placeholder="Bank Account" value={formData.bankAccount} onChange={handleChange} required />

            <input type="text" name="ifsc" placeholder="IFSC Code" value={formData.ifsc} onChange={handleChange} required />

            <input type="text" name="location" placeholder="City" value={formData.location} onChange={handleChange} required />

            <input type="text" name="deliveryZone1" placeholder="Delivery Zone 1" value={formData.deliveryZone1} onChange={handleChange} required />

            <input type="text" name="deliveryZone2" placeholder="Delivery Zone 2" value={formData.deliveryZone2} onChange={handleChange} required />

            <input type="number" name="dailyIncome" placeholder="Daily Income" value={formData.dailyIncome} onChange={handleChange} required />

            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>

          </form>

          {message && <p>{message}</p>}

          {showSuccess && (
            <>
              <Confetti />

              <div className="success-popup">

                <div className="success-box">

                  <div className="checkmark-circle">
                    <div className="checkmark"></div>
                  </div>

                  <h3>Registration Successful!</h3>
                  <p>Redirecting to Worker Login...</p>

                </div>

              </div>
            </>
          )}

          <Footer />

        </div>

      )}

    </>
  );

}

export default WorkerRegister;