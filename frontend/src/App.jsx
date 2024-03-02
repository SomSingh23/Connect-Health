import "./App.css";
import { useLoaderData } from "react-router-dom";

import Navbar from "./Navbar/NavBar";
export default function App() {
  let role = useLoaderData();
  if (role === "patient") {
    return (
      <>
        <Navbar isPatient={true} isDoctor={false} isLogout={true} />
        <div className="home_page"></div>
      </>
    );
  } else if (role === "doctor") {
    return (
      <>
        <Navbar isPatient={false} isDoctor={true} isLogout={true} />
        <div className="home_page"></div>
      </>
    );
  } else {
    return (
      <>
        <Navbar isPatient={true} isDoctor={true} isLogout={false} />
        <div className="home_page"></div>
      </>
    );
  }
}
