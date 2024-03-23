import { Link } from "react-router-dom";
import "./navbar.css";
import navbarLogo from "/navbar/connect-health-removebg-preview2.png";
export default function Navbar({ isPatient, isDoctor, isLogout }) {
  return (
    <>
      <div className="main_navbar">
        <img src={navbarLogo} alt="Connect Health" height={100} />
        <div className="navbar">
          <Link to="/">Home</Link>
          {isPatient && <Link to="/patient">Patient</Link>}
          {isDoctor && <Link to="/doctor">Doctor</Link>}
          <Link to="/ai_doctor">AI Doctor</Link>
          <Link to="/chat_bot">AI Assistant</Link>

          {isLogout && (
            <Link style={{ color: "red" }} to="/logout">
              <b>Logout</b>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
