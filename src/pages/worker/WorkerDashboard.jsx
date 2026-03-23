import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/dashboard.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";


function WorkerDashboard() {

  const workerId = localStorage.getItem("workerId");

  const [worker, setWorker] = useState(null);
  const [riskScore, setRiskScore] = useState(0);
  const [weatherRisk, setWeatherRisk] = useState("");
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);
  const [plans, setPlans] = useState([]);
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [policyId, setPolicyId] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("UPI");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  

  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {

    if (!workerId) {
      window.location.href = "/worker/login";
      return;
    }

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    const res = await axios.get(
      `http://localhost:8085/api/dashboard/${workerId}`
    );

    setWorker(res.data.worker);
    setRiskScore(res.data.riskScore);
    setWeatherRisk(res.data.weatherRisk);
    setPolicies(res.data.policies || []);
    setClaims(res.data.claims || []);
    setPlans(res.data.plans || []);

  };

  const buyPlan = async (planId) => {

    await axios.post(
      `http://localhost:8085/api/policies/buy?workerId=${workerId}&planId=${planId}`
    );

    alert("Plan purchased successfully!");
    fetchDashboard();
  };
  const payPremium = async () => {

  try {

    await axios.post(
      "http://localhost:8085/api/payments/pay",
      {
        workerId: workerId,
        policyId: policyId,
        amount: amount,
        method: method
      }
    );

    
    setPaymentSuccess(true);

    setTimeout(() => {
      setPaymentSuccess(false);
    }, 4000);

  } catch (error) {

    alert("Payment Failed");

  }

};
  const fetchWeather = async () => {

  if (!location) return;

  setLoadingWeather(true);

  try {

    const res = await axios.get(
      `http://localhost:8085/api/weather/${location}`
    );

    setWeather(res.data);

  } catch (err) {
    alert("Location not found");
  }

  setLoadingWeather(false);
};
const openPaymentsTab = () => {
  setActiveTab("payments");
  fetchPayments();
};
const fetchPayments = async () => {

  const res = await axios.get(
    `http://localhost:8085/api/payments/worker/${workerId}`
  );

  setPayments(res.data);
  setFilteredPayments(res.data);

};
const searchPayments = () => {

  if (!searchDate) {
    setFilteredPayments(payments);
    return;
  }

  const filtered = payments.filter(
    (p) => p.paymentDate === searchDate
  );

  setFilteredPayments(filtered);

};


  

  if (!worker) return <h2 className="loading">Loading Dashboard...</h2>;

  const totalClaimAmount = claims.reduce(
    (sum, c) => sum + (c.payoutAmount || 0),
    0
  );

  const approvedClaims = claims.filter(
    c => c.status === "APPROVED"
  ).length;

  const chartData = [
    { name: "Policies", value: policies.length },
    { name: "Claims", value: claims.length }
  ];

  return (
    <>
      <Navbar />

      <div className="dashboard-container">

        {/* Sidebar */}

        <div className="sidebar">

          <h2 className="sidebar-title">Dashboard</h2>

          <button
            className={activeTab === "profile" ? "sidebar-btn active" : "sidebar-btn"}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>

          <button
            className={activeTab === "risk" ? "sidebar-btn active" : "sidebar-btn"}
            onClick={() => setActiveTab("risk")}
          >
            Risk
          </button>

          <button
            className={activeTab === "policies" ? "sidebar-btn active" : "sidebar-btn"}
            onClick={() => setActiveTab("policies")}
          >
            Policies
          </button>
          <button
  className={activeTab === "paypremium" ? "sidebar-btn active" : "sidebar-btn"}
  onClick={() => setActiveTab("paypremium")}
>
  Pay Premium
</button>

          <button
            className={activeTab === "claims" ? "sidebar-btn active" : "sidebar-btn"}
            onClick={() => setActiveTab("claims")}
          >
            Claims
          </button>

          <button
            className={activeTab === "plans" ? "sidebar-btn active" : "sidebar-btn"}
            onClick={() => setActiveTab("plans")}
          >
            Plans
          </button>

          <button
            className={activeTab === "analytics" ? "sidebar-btn active" : "sidebar-btn"}
            onClick={() => setActiveTab("analytics")}
          >
            Analytics
          </button>
          <button
  className={activeTab === "payments" ? "sidebar-btn active" : "sidebar-btn"}
  onClick={openPaymentsTab}
>
  Payments
</button>
          <button
  className={activeTab === "weather" ? "sidebar-btn active" : "sidebar-btn"}
  onClick={() => setActiveTab("weather")}
>
  Weather
</button>

          

        </div>


        {/* Content */}

        <div className="content">


          {/* PROFILE */}

          {activeTab === "profile" && (
            <div className="profile-container">

              <div className="profile-header">

                <div className="avatar">
                  {worker.fullName?.charAt(0)}
                </div>

                <div>
                  <h2>{worker.fullName}</h2>
                  <span className="worker-badge">{worker.workerId}</span>
                </div>

              </div>

              <div className="profile-grid">

                <div className="profile-card"><span>Phone</span><p>{worker.phone}</p></div>
                <div className="profile-card"><span>Email</span><p>{worker.email}</p></div>
                <div className="profile-card"><span>Location</span><p>{worker.location}</p></div>
                <div className="profile-card highlight"><span>Daily Income</span><p>₹{worker.dailyIncome}</p></div>
                <div className="profile-card"><span>Aadhaar</span><p>{worker.aadhaar}</p></div>
                <div className="profile-card"><span>PAN</span><p>{worker.pan}</p></div>
                <div className="profile-card"><span>Bank Account</span><p>{worker.bankAccount}</p></div>
                <div className="profile-card"><span>IFSC</span><p>{worker.ifsc}</p></div>
                <div className="profile-card"><span>Delivery Zone 1</span><p>{worker.deliveryZone1}</p></div>
                <div className="profile-card"><span>Delivery Zone 2</span><p>{worker.deliveryZone2}</p></div>

              </div>

            </div>
          )}


          {/* RISK */}

          {activeTab === "risk" && (
            <div className="risk-container">

              <h2>Risk Assessment</h2>

              <div className="risk-card">

                <p>Risk Score</p>

                <div className="risk-bar">
                  <div
                    className="risk-fill"
                    style={{ width: `${riskScore * 5}%` }}
                  ></div>
                </div>

                <span>{riskScore} / 20</span>

              </div>

              <div className="risk-weather">

                <h3>Weather Risk</h3>

                <span className={`weather-badge ${weatherRisk}`}>
                  {weatherRisk}
                </span>

              </div>

            </div>
          )}


          {/* POLICIES */}

          {activeTab === "policies" && (
            <div className="policy-container">

              <h2>Your Policies</h2>

              {policies.map((p) => (

                <div key={p.id} className="policy-card">

                  <div>
                    <h3>Policy #{p.id}</h3>
                    <p>Start Date: {p.startDate}</p>
                  </div>

                  <span className="policy-status">{p.status}</span>

                </div>

              ))}

            </div>
          )}


          {/* CLAIMS */}

          {activeTab === "claims" && (
            <div className="claims-container">

              <h2>Your Claims</h2>

              {claims.map((c) => (

                <div key={c.id} className="claim-card">

                  <div>
                    <p><b>Amount:</b> ₹{c.payoutAmount}</p>
                    <p><b>Reason:</b> {c.reason}</p>
                  </div>

                  <span className={`claim-status ${c.status}`}>
                    {c.status}
                  </span>

                </div>

              ))}

            </div>
          )}


          {/* PLANS */}

          {activeTab === "plans" && (
            <div className="plans-container">

              <h2 className="plans-title">Choose Your Protection Plan</h2>

              <div className="plans-grid">

                {plans.map((plan, index) => (

                  <div
                    key={plan.id}
                    className={`plan-card ${index === 1 ? "recommended" : ""}`}
                  >

                    {index === 1 && (
                      <div className="badge">
                        Most Popular
                      </div>
                    )}

                    <h3 className="plan-name">{plan.planName}</h3>

                    <p className="plan-coverage">{plan.coverage}</p>

                    <div className="plan-price">
                      ₹{plan.weeklyPremium}
                      <span>/week</span>
                    </div>

                    <button
                      className="buy-btn"
                      onClick={() => buyPlan(plan.id)}
                    >
                      Buy Plan
                    </button>

                  </div>

                ))}

              </div>

            </div>
          )}
          


          {/* ANALYTICS TAB */}

          {activeTab === "analytics" && (
            <>

              <div className="overview-grid">

                <div className="overview-card">
                  <h4>Total Policies</h4>
                  <p>{policies.length}</p>
                </div>

                <div className="overview-card">
                  <h4>Claims Approved</h4>
                  <p>{approvedClaims}</p>
                </div>

                <div className="overview-card">
                  <h4>Claim Amount</h4>
                  <p>₹{totalClaimAmount}</p>
                </div>

                <div className="overview-card">
                  <h4>Risk Score</h4>
                  <p>{riskScore}</p>
                </div>

              </div>


              <div className="chart-container">

                <h3>Policies vs Claims</h3>

                <ResponsiveContainer width="100%" height={300}>

                  <BarChart data={chartData}>

                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />

                    <Bar dataKey="value" radius={[6,6,0,0]} />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </>
          )}
          {/* WEATHER TAB */}
          {activeTab === "weather" && (

<div className="weather-container">

<h2 className="weather-title">Check Weather</h2>

<div className="weather-search">

<input
type="text"
placeholder="Enter location (e.g. Vijayawada)"
value={location}
onChange={(e)=>setLocation(e.target.value)}
/>

<button onClick={fetchWeather}>
Check Weather
</button>

</div>


{loadingWeather && (
<p className="weather-loading">Fetching weather...</p>
)}


{weather && (

<div className={`weather-card ${weather.weather[0].main.toLowerCase()}`}>

<h2>{weather.name}, {weather.sys.country}</h2>

<div className="weather-main">

<img
src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
alt="weather"
/>

<div>
<h1>{Math.round(weather.main.temp)}°C</h1>
<p>{weather.weather[0].main}</p>
<p>{weather.weather[0].description}</p>
</div>

</div>


<div className="weather-grid">

<div className="weather-item">
<span>Feels Like</span>
<p>{weather.main.feels_like} °C</p>
</div>

<div className="weather-item">
<span>Min Temp</span>
<p>{weather.main.temp_min} °C</p>
</div>

<div className="weather-item">
<span>Max Temp</span>
<p>{weather.main.temp_max} °C</p>
</div>

<div className="weather-item">
<span>Humidity</span>
<p>{weather.main.humidity}%</p>
</div>

<div className="weather-item">
<span>Pressure</span>
<p>{weather.main.pressure} hPa</p>
</div>

<div className="weather-item">
<span>Wind Speed</span>
<p>{weather.wind.speed} m/s</p>
</div>

<div className="weather-item">
<span>Clouds</span>
<p>{weather.clouds.all}%</p>
</div>

<div className="weather-item">
<span>Visibility</span>
<p>{weather.visibility} m</p>
</div>

<div className="weather-item">
<span>Latitude</span>
<p>{weather.coord.lat}</p>
</div>

<div className="weather-item">
<span>Longitude</span>
<p>{weather.coord.lon}</p>
</div>

</div>

</div>

)}

</div>

)}
{activeTab === "payments" && (

<div className="payments-container">

<h2>Payment History</h2>

<div className="payment-search">

<input
type="date"
value={searchDate}
onChange={(e)=>setSearchDate(e.target.value)}
/>

<button onClick={searchPayments}>
Search
</button>

<button onClick={()=>setFilteredPayments(payments)}>
Reset
</button>

</div>

<table className="payment-table">

<thead>

<tr>
<th>Payment ID</th>
<th>Policy ID</th>
<th>Amount</th>
<th>Method</th>
<th>Status</th>
<th>Date</th>
</tr>

</thead>

<tbody>

{filteredPayments.map((p)=>(
<tr key={p.id}>
<td>{p.id}</td>
<td>{p.policyId}</td>
<td>₹{p.amount}</td>
<td>{p.method}</td>
<td className={`payment-status ${p.status}`}>
{p.status}
</td>
<td>{p.paymentDate}</td>
</tr>
))}

</tbody>

</table>

</div>

)}
{activeTab === "paypremium" && (

<div className="pay-container">

<h2>Pay Premium</h2>

<div className="pay-form">

<input
type="number"
placeholder="Policy ID"
value={policyId}
onChange={(e)=>setPolicyId(e.target.value)}
/>

<input
type="number"
placeholder="Amount"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>

<select
value={method}
onChange={(e)=>setMethod(e.target.value)}
>

<option value="UPI">UPI</option>
<option value="CARD">CARD</option>
<option value="NETBANKING">NET BANKING</option>
<option value="CASH">CASH</option>

</select>

<button onClick={payPremium}>
Pay Premium
</button>

</div>


{paymentSuccess && (

<div className="payment-success">

<div className="checkmark">✔</div>

<h3>Payment Successful!</h3>

<p>Your premium has been paid successfully.</p>

</div>


)}


</div>

)}

        </div>

      </div>
      <Footer />
    </>
  );
}

export default WorkerDashboard;