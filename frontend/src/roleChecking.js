import axios from "axios";
export default async function roleChecking() {
  let token = localStorage.getItem("token");
  let data = await axios.post("http://localhost:3001/api/auth/verify", {
    token,
  });
  return data.data.role;
}
