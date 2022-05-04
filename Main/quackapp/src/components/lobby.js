import "../css/App.css";
import pictures from "../imgs/normalDuck.png";
import { useNavigate } from "react-router-dom";

export default function Lobby() {
  const navigate = useNavigate();
  function runmethod() {
    navigate("/logIn");
  }
  return (
    <div className="lobby">
      <button className="startButton" onClick={runmethod}>
        Start
      </button>
      <div className="container-duck">
        <h1>Quackpocalypse</h1>
        <img
          className="duck"
          src={pictures}
          id="startDuck"
          height={"100px"}
          width={"100px"}
        />
        <img
          className="duck2"
          src={pictures}
          id="startDuck"
          height={"100px"}
          width={"100px"}
        />
      </div>
    </div>
  );
}
