import Navbar from "../Navbar/NavBar";
import { useLoaderData, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { GoogleLogin } from "@react-oauth/google";
import button_logo from "/button_logo/button_logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./doctor.css";
import { useEffect } from "react";
import axios from "axios";
function Room() {
  const role = useLoaderData();
  const navigate = useNavigate();
  const [isPatient, setIsPatient] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

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
          url: `http://localhost:5173/doctor/schedule/${roomID}`,
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
  // removing patient role because patient it the only one who will be using the room

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
      <Navbar isDoctor={isDoctor} isLogout={true} />
      <div>
        <div ref={myMeeting} />
      </div>
    </>
  );
}

export default Room;
