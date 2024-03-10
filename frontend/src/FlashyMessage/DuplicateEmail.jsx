import { useState, useEffect } from "react";
import "./FlashyMessage.css"; // Import CSS for styling

const DuplicateEmail = ({ message }) => {
  const [visible, setVisible] = useState(true);

  // Hide the message after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flashy-message ${visible ? "visible" : ""}`}>
      {message}
    </div>
  );
};

export default DuplicateEmail;
