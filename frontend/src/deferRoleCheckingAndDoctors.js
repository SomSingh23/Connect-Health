import axios from "axios";
import BACKEND_URL from "./services/api";
import { defer } from "react-router-dom";
async function roleChecking() {
  let token = localStorage.getItem("token");
  let data = await axios.post(`${BACKEND_URL}/api/auth/verify`, {
    token,
  });
  let doctorData = await axios.post(
    `${BACKEND_URL}/api/consultation/getdoctor`,
    {
      token,
    }
  );

  let role = data.data.role;
  let doctorList = doctorData.data.doctors;
  return { role, doctorList };
}
export default function deferRoleChecking() {
  return defer({ role: roleChecking() });
}
