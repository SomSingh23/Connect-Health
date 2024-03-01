import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import button_logo from "/button_logo/button_logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./patient.css";
export default function Patient() {
  const [log, setLog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    /*global google*/

    let handleLogic = async () => {
      try {
        // requesting verification of token
        let __token = localStorage.getItem("_Token_");
        let _role = await axios.post(
          "http://localhost:3001/api/patient/verify",
          {
            token: __token,
          }
        );
        if (_role.data.role === "patient") {
          setLog(true);
          setIsLoading(false);
        } else {
          // this is a naughty doctor :__D
          navigate("/doctor");
        }
      } catch (err) {
        google.accounts.id.initialize({
          client_id:
            "1046716752032-28rvh1r1374cvfk00uomnm1f2km1anag.apps.googleusercontent.com",
          callback: async (response) => {
            // main login
            const decoded = jwtDecode(response.credential);
            let _data = await axios.post(
              "http://localhost:3001/api/patient/register",
              {
                email: decoded.email,
              }
            );
            localStorage.setItem("_Token_", _data.data.token);
            setLog(true);
          },
        });

        google.accounts.id.renderButton(
          document.getElementById("google_login_hack"),
          {
            type: "standard",
            size: "large",
          }
        );
        setIsLoading(false);
      }
    };
    handleLogic();
  }, []);

  if (isLoading) {
    return <div></div>;
  }
  return (
    <>
      {log === true ? (
        <div>
          <h1>Patient Logged In</h1>
          <h2>Content Will be Loaded Soon</h2>
        </div>
      ) : (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "400px",
              height: "400px",
              backgroundColor: "white",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {" "}
            <div
              style={{ border: "2px solid grey", borderRadius: "5px" }}
              id="google_login_hack"
            ></div>
            <img height={"200px"} src={button_logo} alt="button_logo" />
            <Link className="link" to="/">
              Home ←
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
