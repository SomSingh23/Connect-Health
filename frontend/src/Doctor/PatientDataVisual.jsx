import Navbar from "../Navbar/NavBar";
import { useLoaderData } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import button_logo from "/button_logo/button_logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./doctor.css";
import { useEffect } from "react";
import axios from "axios";
function PatientDataVisual() {
  const role = useLoaderData();
  const navigate = useNavigate();
  const [isPatient, setIsPatient] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  useEffect(() => {
    if (role === "patient") {
      navigate("/patient");
    }
  }, []);

  if (role === "noRole" && isPatient === false && isDoctor === false) {
    return (
      <>
        <Navbar isPatient={!isPatient} isDoctor={!isDoctor} />
        <div className="login_with_google">
          <p style={{ margin: "0px" }}>Sign in as Doctor</p>

          <img
            src={button_logo}
            height={"150px"}
            width={"150px"}
            alt="Google Login"
          />
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              let data = await axios.post(
                "https://alpine-backend-hackiniiitp.vercel.app/api/auth/generateTokenD",
                {
                  token: credentialResponse.credential,
                }
              );
              localStorage.setItem("token", data.data.token);

              setIsDoctor(true);
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
      <Navbar isDoctor={true} isLogout={true} />
      <div>
        <h1>Patient Data Visualization Here :______D</h1>
        <h1>Working on this...</h1>
      </div>
    </>
  );
}

export default PatientDataVisual;