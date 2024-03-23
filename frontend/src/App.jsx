import "./App.css";
import Thumbnail1 from "/thumbnails/meeting.png";
import Thumbnail2 from "/thumbnails/ai_doctor2.png";
import Thumbnail3 from "/thumbnails/chat.jpg";
import Thumbnail4 from "/thumbnails/doctor2.png";
import Patient from "/thumbnails/patient.png";
import Vedio from "/thumbnails/role3.mp4";
import { useLoaderData, Await, Link } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "./Navbar/NavBar";
import { ThreeDots } from "react-loader-spinner";
export default function App() {
  let { role } = useLoaderData();
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
            if (role === "patient") {
              return (
                <>
                  <Navbar isPatient={true} isDoctor={false} isLogout={true} />
                  <div className="home_page">
                    <h1>Logged in as patient</h1>
                  </div>
                </>
              );
            } else if (role === "doctor") {
              return (
                <>
                  <Navbar isPatient={false} isDoctor={true} isLogout={true} />
                  <div className="home_page">
                    <h1>Logged in as Doctor</h1>
                  </div>
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
        <img src={img} alt="thumbnail" height={180} />
        <p style={{ textAlign: "center" }}>{text}</p>
      </div>
    </>
  );
};

let Card2 = ({ img, text }) => {
  return (
    <>
      <div className="card2">
        <img src={img} alt="thumbnail" height={250} />
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
    </>
  );
};
