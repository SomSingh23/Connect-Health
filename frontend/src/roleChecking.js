import axios from "axios";
export default async function roleChecking() {
  let token = localStorage.getItem("token");
  let data = await axios.post(
    "https://alpine-backend-hackiniiitp.vercel.app/api/auth/verify",
    {
      token,
    }
  );
  return data.data.role;
}
