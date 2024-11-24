import "./Copyright.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 Som Singh Lodhi. All rights reserved.</p>

      <p>
        Website by <a href="https://github.com/somsingh23">Som</a> and{" "}
        <a href="https://www.linkedin.com/in/aditya-sharma-58b9501b8">Aditya</a>
      </p>
    </footer>
  );
};

export default Footer;
