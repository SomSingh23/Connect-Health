import "./chat.css";
import Navbar from "../Navbar/NavBar";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { marked } from "marked";
import axios from "axios";
import BACKEND_URL from "../services/api";
const waitingMessages = [
  "Hang tight! I'm fetching the perfect response for you.",
  "Just a moment while I gather some insights for you.",
  "Sit tight! I'm working on finding the best answer for you.",
  "Thanks for your patience! I'm on it.",
  "I'm here, just processing your request. Won't be long!",
  "Getting your answer ready. Thanks for waiting!",
  "Almost there! I appreciate your patience.",
  "Just a moment while I consult my virtual brain.",
  "Hold on tight! I'm diving into the data for you.",
  "I'm on the case! Thanks for giving me a moment.",
];

const ChatBot = () => {
  let [value, setValue] = useState("");
  let [data, setData] = useState({});
  let [count, setCount] = useState(0);
  let [loading, setLoading] = useState(false);
  let [htmlResponse, setHtmlResponse] = useState("");
  let handlePrompt = async () => {
    try {
      setCount((p) => p + 1);
      setLoading((p) => !p);
      setData({ user: value, response: "..." });
      let data = await axios.post(`${BACKEND_URL}/api/chat/bot1`, {
        prompt: value,
      });
      setValue("");
      setData({ ...data.data });
      const _gather = marked(data.data.response);
      setHtmlResponse(_gather);

      setLoading((p) => !p);
    } catch (err) {
      console.log(err);
      let newObj = {
        user: value,
        response: "Network Error 😢",
      };
      setData({ ...newObj });
      setLoading((p) => !p);
    }
  };
  return (
    <>
      {" "}
      <div className="app">
        <div className="content">
          <div className="conservation">
            {count === 0 ? (
              <h1
                style={{
                  textAlign: "center",
                  margin: 0,
                  padding: "10px",
                  color: "rgb(135, 138, 137)",
                }}
              >
                How can I help you today?
              </h1>
            ) : (
              ""
            )}

            {count > 0 ? (
              <div>
                <p
                  style={{
                    marginTop: "10px",
                    fontSize: "27px",
                    marginBottom: "10px",
                    fontFamily: "Helvetica",
                    paddingLeft: "20px",
                    color: "rgb(69, 69, 0)",
                  }}
                >
                  {"👤 " + data.user}
                </p>
                {loading ? (
                  <div className="loading">
                    <p>{"🧑‍⚕️"}</p>
                    <div className="loader"></div>
                  </div>
                ) : (
                  <p
                    style={{
                      color: "rgb(69, 69, 22)",
                      margin: 0,
                      paddingLeft: "20px",
                    }}
                  >
                    <p
                      style={{
                        color: "#0c0c0c",

                        fontFamily: [
                          "Trebuchet MS",
                          "Lucida Sans Unicode",
                          "Lucida Grande",
                          "Lucida Sans",
                          " Arial",
                          "sans-serif",
                        ],
                      }}
                      dangerouslySetInnerHTML={{ __html: htmlResponse }}
                    />
                  </p>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="prompt">
            {loading === true ? (
              <input
                type="text"
                value={
                  waitingMessages[
                    Math.floor(Math.random() * waitingMessages.length)
                  ]
                }
                readOnly
              ></input>
            ) : (
              <input
                type="text"
                placeholder="Message Health-GPT"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            )}
            {loading === false ? (
              <button onClick={handlePrompt}>⬇️</button>
            ) : (
              <button onClick={handlePrompt} disabled>
                🚫
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
let RealChatBot = () => {
  let role = useLoaderData();
  if (role === "patient") {
    return (
      <>
        <Navbar isPatient={true} isDoctor={false} isLogout={true} />
        <ChatBot />
      </>
    );
  } else if (role === "doctor") {
    return (
      <>
        <Navbar isPatient={false} isDoctor={true} isLogout={true} />
        <ChatBot />
      </>
    );
  } else {
    return (
      <>
        <Navbar isPatient={true} isDoctor={true} isLogout={false} />
        <ChatBot />
      </>
    );
  }
};

export default RealChatBot;
