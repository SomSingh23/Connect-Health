import { useNavigate, useLoaderData } from "react-router-dom";
import Navbar from "../Navbar/NavBar";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
export default function Logout() {
  const navigate = useNavigate();
  const role = useLoaderData();
  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/");
  }, [navigate]);

  if (role === "doctor") {
    return (
      <>
        <Helmet>
          <title>Connect Health | Doctor | Logout</title>
        </Helmet>
        <Navbar isDoctor={true} isLogout={true} />
        <div>
          <h1>Logging you out. Please wait...</h1>
        </div>
      </>
    );
  } else if (role === "patient") {
    return (
      <>
        <Helmet>
          <title>Connect Health | Patient | Logout</title>
        </Helmet>
        <Navbar isPatient={true} isLogout={true} />
        <div>
          <h1>Logging you out. Please wait...</h1>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Helmet>
          <title>Connect Health | Logout</title>
        </Helmet>
        <Navbar isPatient={false} isDoctor={false} isLogout={false} />
        <div>
          <h1>Logging you out. Please wait...</h1>
        </div>
      </>
    );
  }
}
