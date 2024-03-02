import { Link } from "react-router-dom";
import "./navbar.css";
export default function Navbar({ isPatient, isDoctor, isLogout }) {
  return (
    <>
      <div className="navbar">
        <Link to="/">Home</Link>
        {isDoctor && <Link to="/doctor">Doctor</Link>}

        {isPatient && <Link to="/patient">Patient</Link>}

        <Link to="/chat_bot">AI Assistant</Link>

        <Link to="/data_visualization">Data Visualization</Link>

        {isLogout && (
          <Link style={{ color: "red" }} to="/logout">
            <b>Logout</b>
          </Link>
        )}
      </div>
    </>
  );
}
