import { GoogleOAuthProvider } from "@react-oauth/google";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Patient from "./patient/Patient.jsx";
import ChatBot from "./Chatbot/Chat.jsx";
import roleChecking from "./roleChecking.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <App />,
  },
  {
    path: "doctor",
    element: <h1>Doctor</h1>,
  },
  {
    path: "patient",
    element: <Patient />,
    loader: roleChecking,
  },
  {
    path: "chat_bot",
    element: <ChatBot />,
  },
  {
    path: "data_visualization",
    element: <h1>Data Visualization</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1046716752032-28rvh1r1374cvfk00uomnm1f2km1anag.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
