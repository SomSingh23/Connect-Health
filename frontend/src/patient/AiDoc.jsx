import "./AiDoc.css";
import Navbar from "../Navbar/NavBar";
import { useState } from "react";
import axios from "axios";
import { marked } from "marked";
import { useLoaderData } from "react-router-dom";
import BACKEND_URL from "../services/api";
const ChatBot = () => {
  let [value, setValue] = useState("");
  let [data, setData] = useState({});
  let [count, setCount] = useState(0);
  let [loading, setLoading] = useState(false);
  let [customValue, setCustomValue] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [formattedResponse, setFormattedResponse] = useState("");
  let handlePrompt = async () => {
    try {
      let promptValue =
        "I have these symptoms: " +
        selectedSymptoms.join(", ") +
        customValue +
        ". Give me a possible Diagnosis and Treatment Plan for now later i will consult a doctor.";
      setValue(promptValue);
      setCount((p) => p + 1);
      setLoading((p) => !p);
      setData({ user: promptValue, response: "..." });
      const response = await axios.post(`${BACKEND_URL}/api/chat/bot1`, {
        prompt: promptValue,
      });
      setValue("");
      setData(response.data);
      const htmlResponse = marked(response.data.response);
      setFormattedResponse(htmlResponse);
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
  const handleClick = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };
  return (
    <>
      <h1>Enter Symptoms</h1>
      <div className="Complete">
        <button
          className={
            selectedSymptoms.includes("Sore Throat") ? "btn_selected" : "btn"
          }
          onClick={() => handleClick("Sore Throat")}
        >
          Sore Throat
        </button>
        <button
          className={
            selectedSymptoms.includes("Fever") ? "btn_selected" : "btn"
          }
          onClick={() => handleClick("Fever")}
        >
          Fever
        </button>
        <button
          className={
            selectedSymptoms.includes("Fatigue") ? "btn_selected" : "btn"
          }
          onClick={() => handleClick("Fatigue")}
        >
          Fatigue
        </button>
        <button
          className={
            selectedSymptoms.includes("Cough") ? "btn_selected" : "btn"
          }
          onClick={() => handleClick("Cough")}
        >
          Cough
        </button>

        <button
          className={
            selectedSymptoms.includes("HeadAche") ? "btn_selected" : "btn"
          }
          onClick={() => handleClick("HeadAche")}
        >
          HeadAche
        </button>
        <button
          className={
            selectedSymptoms.includes("BodyAches") ? "btn_selected" : "btn"
          }
          onClick={() => handleClick("BodyAches")}
        >
          BodyAches
        </button>
        <button
          className={
            selectedSymptoms.includes("Shortness of Breath")
              ? "btn_selected"
              : "btn"
          }
          onClick={() => handleClick("Shortness of Breath")}
        >
          Shortness of Breath
        </button>
      </div>

      <div className="extraSymp">
        <input
          className="TxT"
          type="text"
          onChange={(e) => setCustomValue(e.target.value)}
          value={customValue}
          placeholder="Add Symptom"
        />
        <button className="SubmitBtn" onClick={handlePrompt}>
          Submit
        </button>
      </div>

      <div className="handleAnswer">
        {loading === true ? (
          <div className="loading">
            <p>Loading </p>
            <div className="loader"></div>
          </div>
        ) : (
          <p
            className="Answer"
            style={{
              color: "black",
            }}
            dangerouslySetInnerHTML={{ __html: formattedResponse }}
          />
        )}
      </div>
    </>
  );
};
let AiDoc = () => {
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
export default AiDoc;
