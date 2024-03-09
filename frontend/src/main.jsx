import { GoogleOAuthProvider } from "@react-oauth/google";
import { Analytics } from "@vercel/analytics/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Patient from "./patient/Patient.jsx";
import ChatBot from "./Chatbot/Chat.jsx";
import roleChecking from "./roleChecking.js";
import Doctor from "./Doctor/Doctor.jsx";
import Logout from "./Logout/Logout.jsx";
import Schedule from "./Doctor/Schedule.jsx";
import Room from "./Doctor/Room.jsx";
import PatientDataVisual from "./Doctor/PatientDataVisual.jsx";
import AiDoc from "./patient/AiDoc.jsx";
import PageNotFound from "./PageNotFound/PageNotFound.jsx";
import deferRoleChecking from "./deferRoleChecking.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Something Went Wrong</h1>,
    loader: deferRoleChecking,
    // to prevent cold-warn start of server 💁‍♂️
  },
  {
    path: "doctor",
    element: <Doctor />,
    loader: roleChecking,
  },
  {
    path: "patient",
    element: <Patient />,
    loader: roleChecking,
  },
  {
    path: "chat_bot",
    element: <ChatBot />,
    loader: roleChecking,
  },

  {
    path: "logout",
    element: <Logout />,
    loader: roleChecking,
  },
  {
    path: "doctor/schedule",
    element: <Schedule />,
    loader: roleChecking,
  },
  {
    path: "doctor/schedule/:id",
    element: <Room />,
    loader: roleChecking,
  },
  {
    path: "doctor_data_visualization",
    element: <PatientDataVisual />,
    loader: roleChecking,
  },
  {
    path: "patient_request_consultation",
    element: (
      <div>
        <h1>patient_request_consultation</h1>
        <h1>
          Email notifications will be sent to the doctor, and additional
          functionalities will be incorporated...
        </h1>
      </div>
    ),
    loader: roleChecking,
  },
  {
    path: "ai_doctor",
    element: <AiDoc />,
    loader: roleChecking,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1046716752032-28rvh1r1374cvfk00uomnm1f2km1anag.apps.googleusercontent.com">
      <RouterProvider router={router} />
      <Analytics />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
