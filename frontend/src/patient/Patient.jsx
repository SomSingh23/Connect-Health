import Navbar from "../Navbar/NavBar";
import { useLoaderData } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import button_logo from "/button_logo/button_logo.png";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./patient.css";
import { useEffect } from "react";
import axios from "axios";
function Patient() {
  const role = useLoaderData();
  const navigate = useNavigate();
  const [isPatient, setIsPatient] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  useEffect(() => {
    if (role === "doctor") {
      navigate("/doctor");
    }
  }, []);

  if (role === "noRole" && isPatient === false && isDoctor === false) {
    return (
      <>
        <Navbar isPatient={!isPatient} isDoctor={!isDoctor} />
        <div className="login_with_google">
          <p style={{ margin: "0px" }}>Sign in as Patient</p>

          <img
            src={button_logo}
            height={"150px"}
            width={"150px"}
            alt="Google Login"
          />
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              let data = await axios.post(
                "https://alpine-backend-hackiniiitp.vercel.app/api/auth/generateTokenP",
                {
                  token: credentialResponse.credential,
                }
              );
              localStorage.setItem("token", data.data.token);
              setIsPatient(true);
              setIsLogout(true);
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
      <Navbar isPatient={true} isLogout={true} />
      <div className="patient">
        <Link className="patient_function" to={"/patient_request_consultation"}>
          Request Consultation
        </Link>
        <br />
        <Link className="patient_function" to={"/ai_doctor"}>
          AI Doctor
        </Link>
      </div>
    </>
  );
}

export default Patient;
