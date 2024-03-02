import Navbar from "../Navbar/NavBar";
function Patient() {
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
