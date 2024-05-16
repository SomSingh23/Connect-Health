import Navbar from "../Navbar/NavBar";
import PatientPhoto from "/thumbnails/patient.png";
import { useLoaderData, Await } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import button_logo from "/button_logo/google_gif3.gif";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./patient.css";
import BACKEND_URL from "../services/api";
import axios from "axios";
import FallBackUi from "../Fallback/FallbackUi";
import FallBackUi2 from "../Fallback/FallbackUi2";
import SuccessMessage from "../FlashyMessage/SuccessMessage";
import DuplicateEmail from "../FlashyMessage/DuplicateEmail";
import { Suspense } from "react";
import { ThreeDots } from "react-loader-spinner";
import DoctorCard from "./DoctorCard";
import Copyright from "../Copyright/Copyright";
function RequestConsulation() {
  let { role } = useLoaderData();
  const navigate = useNavigate();
  const [isPatient, setIsPatient] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const [showFlashy, setShowFlashy] = useState(false);
  const [sendingMail, setSendingMail] = useState(false);

  const requestDoctorLogin = async (id) => {
    try {
      setSendingMail(true);
      setIsLoading(true);
      let token = localStorage.getItem("token");
      await axios.post(`${BACKEND_URL}/api/consultation/request/${id}`, {
        token,
      });
      window.location.reload();
      setIsLoading(false);
      setSendingMail(false);
    } catch (err) {
      setIsLoading(false);
      setSendingMail(false);
      console.log(err);
    }
  };

  return (
    <>
      <Suspense
        fallback={
          <div className="main-loader-fallback">
            <ThreeDots
              visible={true}
              height="120"
              width="120"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
            />
          </div>
        }
      >
        <Await resolve={role}>
          {(role) => {
            if (role.role === "doctor") {
              navigate("/doctor");
            }
            if (isLoading === true && sendingMail === true) {
              return (
                <>
                  <h1 className="sendMail">Sending Mail to Doctor ✉️</h1>
                  <FallBackUi2 />;
                </>
              );
            }
            if (isLoading === true) {
              return <FallBackUi />;
            }
            if (
              role.role === "noRole" &&
              isLoading === false &&
              isEmailDuplicate === true
            ) {
              return (
                <>
                  {" "}
                  <Navbar isPatient={!isPatient} isDoctor={!isDoctor} />
                  <DuplicateEmail
                    message={"A Doctor Account with This Email Already Exists"}
                  />
                  <h1 className="signHeading">Sign in as Patient</h1>
                  <div className="mainLogin">
                    <img
                      draggable="false"
                      className="patient_image"
                      src={PatientPhoto}
                      alt="Patient"
                    />
                    <div className="login_with_google2">
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
                      <img
                        draggable="false"
                        src={button_logo}
                        height={"230px"}
                        width={"230px"}
                        alt="Google Login"
                        style={{ padding: "20px", boxSizing: "border-box" }}
                      />
                    </div>
                  </div>
                  <Copyright />
                </>
              );
            }
            if (
              role.role === "noRole" &&
              isPatient === false &&
              isDoctor === false
            ) {
              return (
                <>
                  <Navbar isPatient={!isPatient} isDoctor={!isDoctor} />
                  <h1 className="signHeading">Sign in as Patient</h1>
                  <div className="mainLogin">
                    <img
                      draggable="false"
                      className="patient_image"
                      src={PatientPhoto}
                      alt="Patient"
                    />
                    <div className="login_with_google2">
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
                          setShowFlashy(true);
                          setIsEmailDuplicate(false);
                        }}
                        onError={() => {
                          console.log("Login Failed");
                        }}
                      />
                      <img
                        draggable="false"
                        src={button_logo}
                        height={"230px"}
                        width={"230px"}
                        alt="Google Login"
                        style={{ padding: "20px", boxSizing: "border-box" }}
                      />
                    </div>
                  </div>
                  <Copyright />
                </>
              );
            } else {
              return (
                <>
                  <Navbar isPatient={true} isLogout={true} />
                  {showFlashy && (
                    <SuccessMessage
                      message={"You're Now Logged in as a Patient"}
                    />
                  )}
                  <h1
                    style={{ margin: 0, fontWeight: "bold", padding: "30px" }}
                  >
                    Request Consultation
                  </h1>
                  <div className="doctorList">
                    {role.doctorList.map((doctor, index) => {
                      return (
                        <DoctorCard
                          key={index}
                          name={`Doctor ${index + 1}`}
                          picture={doctor.picture}
                          uuid={doctor.uuid}
                          logicMagic={() => requestDoctorLogin(doctor.uuid)}
                        />
                      );
                    })}
                  </div>
                  <Copyright />
                </>
              );
            }
          }}
        </Await>
      </Suspense>
    </>
  );
}

export default RequestConsulation;
