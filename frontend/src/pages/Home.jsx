import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className="home-page">
      <section className="home-header">
        <h1>Manage Your Groceries Smartly</h1>
        <p>Track, manage and save money effortlessly</p>
      </section>

      <section className="card-container">
        <div className="card" onClick={() => navigate("/dashboard")}>
          <span className="icon">📦</span>
          <h3>Track Grocery</h3>
          <p>Manage and monitor all your grocery items easily</p>
        </div>

        <div className="card" onClick={() => navigate("/login")}>
          <span className="icon">🔐</span>
          <h3>Login</h3>
          <p>Access your account securely anytime</p>
        </div>

        <div className="card" onClick={() => navigate("/register")}>
          <span className="icon">📝</span>
          <h3>Register</h3>
          <p>Create a new account in just a few steps</p>
        </div>

        <div className="card disabled">
          <span className="icon">📊</span>
          <h3>Expense Tracker</h3>
          <p>Advanced expense tracking coming soon</p>
        </div>
      </section>
      </div>
    </>
  );
};

export default Home;