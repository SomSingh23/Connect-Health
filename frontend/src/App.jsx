import "./App.css";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar/NavBar";
export default function App() {
  const [isPatient, setIsPatient] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);

  const role = useLoaderData();
  useEffect(() => {
    console.log(role);
    if (role === "patient") {
      setIsPatient(true);
    } else if (role === "doctor") {
      setIsDoctor(true);
    } else {
      setIsPatient(false);
      setIsDoctor(false);
    }
  }, []);
  return (
    <>
      <Navbar
        isPatient={!isPatient}
        isDoctor={!isDoctor}
        isLogout={isPatient || isDoctor}
      />
      <div className="home_page"></div>
    </>
  );
}
