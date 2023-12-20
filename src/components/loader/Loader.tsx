import { LOADING } from "../../assets";
import "./style.scss";

function Loader() {
  return (
    <div className="main_loader">
      <img src={LOADING} alt="main loader" />
    </div>
  );
}

export default Loader;
