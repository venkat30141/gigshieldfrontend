import zepto from "./logos/Zepto.png";
import blinkit from "./logos/blinkit.png";
import swiggy from "./logos/swiggy.png";
import dunzo from "./logos/dunzo.png";
import instamart from "./logos/instamart.png";
import applogo from "./logos/applogo.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/home.css";

function Home() {

  return (
    <div className="home">

      {/* PARTICLE BACKGROUND */}
      <div className="particles"></div>

      <Navbar />


      {/* HERO SECTION */}
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(42,41,41,0.6), rgba(0,0,0,0.6)), url(${applogo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >

        <div className="hero-content">

          <h1 className="hero-title">
            GigShield AI
          </h1>

          <p className="hero-subtitle">
            Smart Insurance Protection for Q-Commerce Delivery Workers
          </p>

          <div className="hero-buttons">

            <a href="/login">
              <button className="btn-primary">
                Login
              </button>
            </a>

            <a href="/register">
              <button className="btn-secondary">
                Register
              </button>
            </a>

          </div>

        </div>

      </section>


      {/* COMPANY LOGOS */}
      <section className="companies">

        <h2>Trusted by workers from</h2>

        <div className="logo-slider">
          <div className="logo-track">

            <img src={zepto} alt="Zepto" />
            <img src={blinkit} alt="Blinkit" />
            <img src={swiggy} alt="Swiggy" />
            <img src={dunzo} alt="Dunzo" />
            <img src={instamart} alt="Instamart" />

            {/* repeat for smooth animation */}

            <img src={zepto} alt="Zepto" />
            <img src={blinkit} alt="Blinkit" />
            <img src={swiggy} alt="Swiggy" />
            <img src={dunzo} alt="Dunzo" />
            <img src={instamart} alt="Instamart" />

          </div>
        </div>

      </section>


      {/* FEATURES */}
      <section className="features">

        <h2>Why GigShield?</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>Weather Protection</h3>
            <p>
              Automatic claim triggers during rain, storms and disruptions.
            </p>
          </div>

          <div className="feature-card">
            <h3>Risk Engine</h3>
            <p>
              AI risk scoring based on location, AQI and disruptions.
            </p>
          </div>

          <div className="feature-card">
            <h3>Instant Claims</h3>
            <p>
              Parametric insurance payouts without paperwork.
            </p>
          </div>

          <div className="feature-card">
            <h3>Affordable Premium</h3>
            <p>
              Dynamic pricing designed for gig workers.
            </p>
          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}
      <section className="workflow">

        <h2>How GigShield Works</h2>

        <div className="workflow-grid">

          <div className="workflow-card">
            <div className="step-number">1</div>
            <h3>Register</h3>
            <p>
              Gig workers register and connect their delivery platform accounts.
            </p>
          </div>

          <div className="workflow-card">
            <div className="step-number">2</div>
            <h3>Risk Monitoring</h3>
            <p>
              Our AI engine monitors weather, AQI and disruptions in real time.
            </p>
          </div>

          <div className="workflow-card">
            <div className="step-number">3</div>
            <h3>Instant Payout</h3>
            <p>
              When risk triggers occur, automatic insurance payouts are processed instantly.
            </p>
          </div>

        </div>

      </section>


      {/* AI RISK ENGINE */}
      <section className="ai-section">

        <h2 className="ai-title">GigShield Intelligence</h2>

        <div className="ai-grid">

          <div className="ai-card">
            <div className="ai-icon">🌧</div>
            <h3>Weather Detection</h3>
            <p>
              Real-time rain, storm and disruption monitoring for delivery zones.
            </p>
          </div>

          <div className="ai-card">
            <div className="ai-icon">🌫</div>
            <h3>AQI Risk Analysis</h3>
            <p>
              Detects pollution levels and risk exposure for outdoor workers.
            </p>
          </div>

          <div className="ai-card">
            <div className="ai-icon">⚡</div>
            <h3>Instant Trigger</h3>
            <p>
              Insurance payout triggers automatically when risk thresholds are met.
            </p>
          </div>

        </div>

      </section>


     

      {/* STATS */}
      <section className="stats">

        <div className="stat">
          <h3>10K+</h3>
          <p>Workers Protected</p>
        </div>

        <div className="stat">
          <h3>₹50L+</h3>
          <p>Claims Processed</p>
        </div>

        <div className="stat">
          <h3>5+</h3>
          <p>Q-Commerce Platforms</p>
        </div>

      </section>


      {/* CTA */}
      <section className="cta">

        <h2>Protect Your Income Today</h2>

        <p>
          Join GigShield and secure your deliveries against disruptions.
        </p>

        <a href="/register">
          <button className="btn-primary">
            Get Started
          </button>
        </a>

      </section>

        <Footer />

    </div>
  );
}

export default Home;
