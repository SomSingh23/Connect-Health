import Navbar from "../Navbar/NavBar";
import FallBackUi2 from "../Fallback/FallbackUi2";
import PatientPhoto from "/thumbnails/patient.png";
import { useLoaderData, Await } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import button_logo from "/button_logo/google_gif3.gif";
import { useNavigate, Link } from "react-router-dom";
import { marked } from "marked";
import { useState } from "react";
import "./patient.css";
import BACKEND_URL from "../services/api";
import axios from "axios";
import FallBackUi from "../Fallback/FallbackUi";
import SuccessMessage from "../FlashyMessage/SuccessMessage";
import DuplicateEmail from "../FlashyMessage/DuplicateEmail";
import { Suspense } from "react";
import { ThreeDots } from "react-loader-spinner";
import Copyright from "../Copyright/Copyright";
function UploadReports() {
  let { role } = useLoaderData();
  const navigate = useNavigate();
  const [isPatient, setIsPatient] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const [showFlashy, setShowFlashy] = useState(false);
  const [image, setImage] = useState(null); // Store only one image
  const [buildingResp, setBuildingResp] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resp, setResp] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get only the first file
    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target.result); // Set the image to be uploaded
    };

    reader.readAsDataURL(file);
  };

  const handleOptionClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setIsLoading(true);
    setBuildingResp(true);
    try {
      const formData = new FormData(); // Create a new FormData object

      // Get the file input element
      const fileInput = document.querySelector('input[type="file"]');

      // Get the selected file from the file input element
      const file = fileInput.files[0];

      // Append the file data to the FormData object with the specified field name
      formData.append("uploaded_files", file);

      // Send the FormData object to the server using Axios
      const serverRes = await axios.post(
        `${BACKEND_URL}/api/image_to_text/textract`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
        }
      );
      //   console.log(serverRes); // Log server response
      const _gather = marked(serverRes.data.summaryData);
      setResp(_gather);
      setIsLoading(false);
      setBuildingResp(false);
    } catch (err) {
      console.log(err); // Log any errors
      setIsLoading(false);
      setBuildingResp(false);
    }
    closeModal();
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
            if (role === "doctor") {
              navigate("/doctor");
            }
            if (isLoading === true && buildingResp === true) {
              return (
                <>
                  <h1 className="sendMail">Processing Your Request ⚙️</h1>
                  <FallBackUi2 />;
                </>
              );
            }
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
              role === "noRole" &&
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
                  <h1>Upload Past Reports</h1>
                  <div className="uploadImageContainer">
                    <button className="option-btn" onClick={handleOptionClick}>
                      Upload
                    </button>
                  </div>

                  {showModal && (
                    <div className="modal">
                      <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                          &times;
                        </span>
                        <h2 className="headinguploadimage">Upload Image</h2>
                        <form onSubmit={handleSubmit}>
                          <input
                            accept="image/*"
                            name="uploaded_files"
                            className="INP"
                            type="file"
                            onChange={handleImageChange}
                          />
                          <button className="option-btn1" type="submit">
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  )}

                  {image && ( // Render the uploaded image
                    <div className="card-containerAdityaBugCoder">
                      <div className="cardAdityaBugCoder">
                        <img
                          src={image}
                          alt={`Uploaded Image`}
                          className="uploaded-image"
                        />
                      </div>
                      <p
                        className="testcase2failed"
                        style={{
                          color: "#0c0c0c",
                        }}
                        dangerouslySetInnerHTML={{ __html: resp }}
                      />
                    </div>
                  )}
                  {image && <Copyright />}
                </>
              );
            }
          }}
        </Await>
      </Suspense>
    </>
  );
}

export default UploadReports;
