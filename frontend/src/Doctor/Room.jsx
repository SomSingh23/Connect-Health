import Navbar from "../Navbar/NavBar";
import { useLoaderData } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { GoogleLogin } from "@react-oauth/google";
import button_logo from "/button_logo/button_logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FallBackUi from "../Fallback/FallbackUi";
import "./doctor.css";
import BACKEND_URL from "../services/api";
import axios from "axios";
import SuccessMessage from "../FlashyMessage/SuccessMessage";
import DuplicateEmail from "../FlashyMessage/DuplicateEmail";
function Room() {
  const role = useLoaderData();
  const navigate = useNavigate();
  const [isPatient, setIsPatient] = useState(role === "patient" ? true : false);
  const [isDoctor, setIsDoctor] = useState(role === "doctor" ? true : false);
  const [isLogout, setIsLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const [showFlashy, setShowFlashy] = useState(false);
  if (isLoading === true) {
    return <FallBackUi />;
  }
  if (isLoading === false && isEmailDuplicate === true) {
    return (
      <>
        {" "}
        <Navbar isPatient={!isPatient} isDoctor={!isDoctor} />
        <DuplicateEmail
          message={"Only one doctor is allowed in the room at any given time."}
        />
        <div className="login_with_google">
          <p style={{ margin: "0px", fontFamily: "Arial" }}>
            Sign in as Patient
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
                `${BACKEND_URL}/api/auth/generateTokenP`,
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
              setIsPatient(true);
              setIsLogout(true);
              setIsLoading(false);
              setIsEmailDuplicate(false);
              setShowFlashy(true);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </>
    );
  }
  function randomID(len) {
    let result = "";
    if (result) return result;
    var chars =
        "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }
  const { id } = useParams();
  // console.log(id);
  const roomID = id || randomID(5);
  const myMeeting = async (element) => {
    const appID = 731972228;
    const serverSecret = "d4395074105b4a60c7b3a62d41959dfc";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      id,
      randomID(5),
      randomID(5)
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `https://alpine-frontend-hackiniiitp.vercel.app/doctor/schedule/${roomID}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: false,
      onLeaveRoom: () => {
        navigate("/");
        // shoutout to the Aditya Sharma for building this 🙏
      },
    });
  };
  // removing patient role because patient they are the only one who will be joining the room

  if (role === "noRole" && isPatient === false && isDoctor === false) {
    return (
      <>
        <Navbar isPatient={!isPatient} isDoctor={!isDoctor} />
        <div className="login_with_google">
          <p style={{ margin: "0px", fontFamily: "Arial" }}>
            Sign in as Patient
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
                `${BACKEND_URL}/api/auth/generateTokenP`,
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
              setIsPatient(true);
              setIsLogout(true);
              setIsLoading(false);
              setIsEmailDuplicate(false);
              setShowFlashy(true);
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
      <Navbar isPatient={isPatient} isDoctor={isDoctor} isLogout={true} />
      {showFlashy && (
        <SuccessMessage message={"You're Now Logged in as a Patient"} />
      )}
      <div>
        <div ref={myMeeting} />
      </div>
    </>
  );
}

export default Room;
