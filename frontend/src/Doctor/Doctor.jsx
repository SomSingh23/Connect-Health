import Navbar from "../Navbar/NavBar";
import { useLoaderData, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import button_logo from "/button_logo/button_logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./doctor.css";
import { useEffect } from "react";
import axios from "axios";
import BACKEND_URL from "../services/api";
import FallBackUi from "../Fallback/FallbackUi";
function Doctor() {
  const role = useLoaderData();
  const navigate = useNavigate();
  const [isPatient, setIsPatient] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  useEffect(() => {
    if (role === "patient") {
      navigate("/patient");
    }
  }, []);
  if (isLoading === true && isEmailDuplicate === false) {
    return <FallBackUi />;
  }
  if (isLoading === false && isEmailDuplicate === true) {
    return <h1>This Email is Associated with Patient Account</h1>;
  }
  if (role === "noRole" && isPatient === false && isDoctor === false) {
    return (
      <>
        <Navbar isPatient={!isPatient} isDoctor={!isDoctor} />
        <div className="login_with_google">
          <p style={{ margin: "0px", fontFamily: "Arial" }}>
            Sign in as Doctor
          </p>

          <img
            src={button_logo}
            height={"150px"}
            width={"150px"}
            alt="Google Login"
          />
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              setIsLoading(true);
              let data = await axios.post(
                `${BACKEND_URL}/api/auth/generateTokenD`,
                {
                  token: credentialResponse.credential,
                }
              );
              if (data.data.token === "tokenNotGranted") {
                setIsEmailDuplicate(true);
                setIsLoading(false);
                return;
              }
              localStorage.setItem("token", data.data.token);
              setIsDoctor(true);
              setIsLogout(true);
              setIsLoading(false);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar isDoctor={true} isLogout={true} />
      <div className="doctor">
        <Link className="doctor_function" to={"/doctor/schedule"}>
          Schedule Consultation
        </Link>
        <br />
        <Link className="doctor_function" to={"/doctor_data_visualization"}>
          Patient Data Visualization
        </Link>
      </div>
    </>
  );
}

export default Doctor;
