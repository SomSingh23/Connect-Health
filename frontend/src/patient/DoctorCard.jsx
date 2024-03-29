import "./patient.css";
let DoctorCard = ({ name, picture, uuid, logicMagic }) => {
  return (
    <div className="doctorCard">
      <p>{name}</p>
      <img src={picture} alt={"No Profile Photo"} />

      <button className="button-37" onClick={logicMagic}>
        Consult
      </button>
    </div>
  );
};
export default DoctorCard;
