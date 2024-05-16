import "./App.css";
import Thumbnail1 from "/thumbnails/meeting.png";
import Thumbnail2 from "/thumbnails/ai_doctor.gif";
import Thumbnail3 from "/thumbnails/chat.jpg";
import Thumbnail4 from "/thumbnails/doctor2.png";
import Patient from "/thumbnails/patient.png";
import Vedio from "/thumbnails/role3.mp4";
import { useLoaderData, Await, Link } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "./Navbar/NavBar";
import { ThreeDots } from "react-loader-spinner";
import Copyright from "./Copyright/Copyright";
export default function App() {
  let { role } = useLoaderData();
  return (
    <>
      <Suspense
        fallback={
          <>
            <p
              style={{
                margin: 0,
                padding: "20px",
                textAlign: "center",
                marginBottom: "-70px",
              }}
            >
              Backend deployed on serverless functions. It may take 30-40
              seconds to switch from a cold state to a warm state. Please hold
              on.
            </p>
            <br />
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
          </>
        }
      >
        <Await resolve={role}>
          {(role) => {
            if (role === "patient") {
              return (
                <>
                  <Navbar isPatient={true} isDoctor={false} isLogout={true} />
                  <div className="home_page">
                    <div className="login_role">
                      <h1>
                        Logged in as patient <span className="emoji">😷</span>
                      </h1>
                      <Link to={"/patient"}>
                        <Card2 img={Patient} text="Patient" />
                      </Link>
                    </div>
                  </div>
                  <Copyright />
                </>
              );
            } else if (role === "doctor") {
              return (
                <>
                  <Navbar isPatient={false} isDoctor={true} isLogout={true} />
                  <div className="home_page">
                    <div className="login_role">
                      <h1>
                        Logged in as Doctor <span className="emoji">🧑‍⚕️</span>
                      </h1>
                      <Link to={"/doctor"}>
                        <Card2 img={Thumbnail4} text="Doctor" />
                      </Link>
                    </div>
                  </div>
                  <Copyright />
                </>
              );
            } else {
              return (
                <>
                  <Navbar isPatient={true} isDoctor={true} isLogout={false} />
                  <div className="home_page">
                    <HomePageContent />
                    <ChooseRole />
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

let HomePageContent = () => {
  return (
    <>
      <div className="main_card">
        <Link to={"/patient"}>
          {" "}
          <Card img={Thumbnail1} text="Virtual Consultation" />
        </Link>

        <Link to={"/ai_doctor"}>
          <Card img={Thumbnail2} text="AI Doctor" />
        </Link>
        <Link to={"/chat_bot"}>
          <Card img={Thumbnail3} text="AI Assistant" />
        </Link>
      </div>
    </>
  );
};

let Card = ({ img, text }) => {
  return (
    <>
      <div className="card">
        <img draggable="false" src={img} alt="thumbnail" height={180} />
        <p style={{ textAlign: "center" }}>{text}</p>
      </div>
    </>
  );
};

let Card2 = ({ img, text }) => {
  return (
    <>
      <div className="card2">
        <img draggable="false" src={img} alt="thumbnail" height={250} />
        <p style={{ textAlign: "center" }}>{text}</p>
      </div>
    </>
  );
};

let ChooseRole = () => {
  return (
    <>
      <div className="main_chooserole">
        <video className="chooserole" autoPlay loop muted>
          <source src={Vedio} type="video/mp4" />
          Your browser does not support the video tag.
        </video>{" "}
      </div>

      <div className="two_roles">
        <Link to={"/patient"}>
          <Card2 img={Patient} text="Patient" />
        </Link>

        <Link to={"/doctor"}>
          <Card2 img={Thumbnail4} text="Doctor" />
        </Link>
      </div>
      <Copyright />
    </>
  );
};
