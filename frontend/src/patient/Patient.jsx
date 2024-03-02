import Navbar from "../Navbar/NavBar";
import { useLoaderData } from "react-router-dom";
function Patient() {
  const role = useLoaderData();

  return (
    <>
      <Navbar isPatient={true} />
      <div className="App">
        <h1>My WebRTC App</h1>
      </div>
    </>
  );
}

export default Patient;
