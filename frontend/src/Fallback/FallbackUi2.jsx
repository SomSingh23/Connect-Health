import "./FallbackUi.css";
import { Bars } from "react-loader-spinner";

export default function FallbackUi2() {
  return (
    <div className="main-loader-fallback2">
      <Bars
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
