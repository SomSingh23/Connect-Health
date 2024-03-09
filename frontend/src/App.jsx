import "./App.css";
import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "./Navbar/NavBar";
import { ThreeDots } from "react-loader-spinner";
export default function App() {
  let { role } = useLoaderData();
  return (
    <>
      <Suspense
        fallback={
          <div className="main-loader-fallback">
            <ThreeDots
              visible={true}
              height="120"
              width="120"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
            />
          </div>
        }
      >
        <Await resolve={role}>
          {(role) => {
            if (role === "patient") {
              return (
                <>
                  <Navbar isPatient={true} isDoctor={false} isLogout={true} />
                  <div className="home_page"></div>
                </>
              );
            } else if (role === "doctor") {
              return (
                <>
                  <Navbar isPatient={false} isDoctor={true} isLogout={true} />
                  <div className="home_page"></div>
                </>
              );
            } else {
              return (
                <>
                  <Navbar isPatient={true} isDoctor={true} isLogout={false} />
                  <div className="home_page"></div>
                </>
              );
            }
          }}
        </Await>
      </Suspense>
    </>
  );
}
