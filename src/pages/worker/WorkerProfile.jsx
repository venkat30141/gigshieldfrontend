import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/profile.css";

function WorkerProfile() {

  const workerId = localStorage.getItem("workerId");

  const [worker, setWorker] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {

      const res = await API.get(`/workers/${workerId}`);

      setWorker(res.data);

    } catch (error) {
      console.error("Error loading profile", error);
    }
  };

  if (!worker) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  return (

    <div className="profile-container">

      <h2 className="profile-title">Worker Profile</h2>

      <div className="profile-card">

        <div className="profile-row">
          <span>Full Name</span>
          <p>{worker.fullName}</p>
        </div>

        <div className="profile-row">
          <span>Email</span>
          <p>{worker.email}</p>
        </div>

        <div className="profile-row">
          <span>Phone</span>
          <p>{worker.phone}</p>
        </div>

        <div className="profile-row">
          <span>Worker ID</span>
          <p>{worker.workerId}</p>
        </div>

        <div className="profile-row">
          <span>Aadhaar</span>
          <p>{worker.aadhaar}</p>
        </div>

        <div className="profile-row">
          <span>PAN</span>
          <p>{worker.pan}</p>
        </div>

        <div className="profile-row">
          <span>City</span>
          <p>{worker.location}</p>
        </div>

        <div className="profile-row">
          <span>Bank Account</span>
          <p>{worker.bankAccount}</p>
        </div>

        <div className="profile-row">
          <span>IFSC</span>
          <p>{worker.ifsc}</p>
        </div>

        <div className="profile-row">
          <span>Daily Income</span>
          <p>₹ {worker.dailyIncome}</p>
        </div>

      </div>

    </div>

  );

}

export default WorkerProfile;