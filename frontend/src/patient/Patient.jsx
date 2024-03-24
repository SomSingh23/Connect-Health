import Navbar from "../Navbar/NavBar";
import { useLoaderData, Await } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import button_logo from "/button_logo/button_logo.png";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./patient.css";
import BACKEND_URL from "../services/api";
import { useEffect } from "react";
import axios from "axios";
import FallBackUi from "../Fallback/FallbackUi";
import SuccessMessage from "../FlashyMessage/SuccessMessage";
import DuplicateEmail from "../FlashyMessage/DuplicateEmail";
import { Suspense } from "react";
import { ThreeDots } from "react-loader-spinner";
function Patient() {
  let { role } = useLoaderData();
  const navigate = useNavigate();
  const [isPatient, setIsPatient] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const [showFlashy, setShowFlashy] = useState(false);
  useEffect(() => {
    if (role === "doctor") {
      navigate("/doctor");
    }
  }, []);
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
            if (isLoading === true) {
              return <FallBackUi />;
            }
            if (
              role === "noRole" &&
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
            if (
              role === "noRole" &&
              isPatient === false &&
              isDoctor === false
            ) {
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
                  </div>
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
                  <div className="patient">
                    <Link
                      className="patient_function"
                      to={"/patient_request_consultation"}
                    >
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
          }}
        </Await>
      </Suspense>
    </>
  );
}

export default Patient;
