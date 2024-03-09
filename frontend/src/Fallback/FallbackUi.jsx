import "./FallbackUi.css";
import { ThreeDots } from "react-loader-spinner";

export default function FallbackUi() {
  return (
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
  );
}
