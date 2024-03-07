import { Link } from "react-router-dom";
import Image from "/bg/lost_astro.jpg";
import "./PageNotFound.css";
const NotFoundPage = () => {
  return (
    <div className="main-error-container">
      {" "}
      <div className="error-container">
        <div className="error-content">
          <h1 className="error-code">404</h1>
          <p className="error-message">Oops! Page Not Found</p>
          <p className="error-description">
            Sorry, the page you are looking for could not be found.
          </p>
          <Link to={"/"} className="error-link">
            Return to Home
          </Link>
        </div>
        <div className="error-astronaut">
          <img src={Image} alt="Lost Astronaut" />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
