import Navbar from "../Navbar/NavBar";
import { useLoaderData } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import button_logo from "/button_logo/button_logo.png";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import "./doctor.css";
import FallBackUi from "../Fallback/FallbackUi";
import BACKEND_URL from "../services/api";
import { useEffect } from "react";
import axios from "axios";
import SuccessMessage from "../FlashyMessage/SuccessMessage";
import DuplicateEmail from "../FlashyMessage/DuplicateEmail";
function Schedule() {
  const role = useLoaderData();
  const navigate = useNavigate();
  const [isPatient, setIsPatient] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const [rid, setRid] = useState();
  const [showFlashy, setShowFlashy] = useState(false);
  const HandleClick = useCallback(() => {
    navigate(`/doctor/schedule/${rid}`);
  }, [navigate, rid]);

  useEffect(() => {
    if (role === "patient") {
      navigate("/patient");
    }
  }, []);
  if (isLoading === true) {
    return <FallBackUi />;
  }
  if (role === "noRole" && isLoading === false && isEmailDuplicate === true) {
    return (
      <>
        <Navbar isPatient={!isPatient} isDoctor={!isDoctor} />
        <DuplicateEmail
          message={"A Patient Account with This Email Already Exists"}
        />
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
              setShowFlashy(true);
              setIsEmailDuplicate(false);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </>
    );
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
              setShowFlashy(true);
              setIsEmailDuplicate(false);
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
      {showFlashy && (
        <SuccessMessage message={"You're Now Logged in as a Doctor"} />
      )}
      <div className="room_id_form">
        <div className="Opt">
          <input
            className="buttonDsb"
            type="text"
            onChange={(e) => setRid(e.target.value)}
            placeholder="Enter Room Id"
          />
          <button onClick={HandleClick} className="buttonDsb">
            Get Consultation!
          </button>
        </div>
      </div>
    </>
  );
}

export default Schedule;
