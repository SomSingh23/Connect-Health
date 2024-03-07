import axios from "axios";
import BACKEND_URL from "./services/api";
export default async function roleChecking() {
  let token = localStorage.getItem("token");
  let data = await axios.post(`${BACKEND_URL}/api/auth/verify`, {
    token,
  });
  return data.data.role;
}
