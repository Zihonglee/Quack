import "../css/App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./signUp";
import Login from "./logIn";
import MainScreen from "./mainScreen";
import ForgetPassword from "./forgetPassword";
import CreateUser from "./CreateUser";
import Difficulty from "./Difficulty";
import Waiting from "./Waiting";
import Game from "./Game";
import UserProfile from "./UserProfile";
import Chat from "./Chat";
import Lobby from "./lobby";
import Achievement from "./achievement";

function App() {
  const [user, setUser] = useState("");
  const [playerNo, setPlayerNo] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Lobby />} />
      <Route path="/logIn" element={<Login setEmail={setUser} />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/mainScreen" element={<MainScreen user={user} />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/UserProfile" element={<UserProfile user={user} />} />
      <Route path="/Chat" element={<Chat user={user} />} />
      <Route path="/achievement" element={<Achievement />} />
      <Route
        path="/CreateUser"
        element={<CreateUser setPlayerNo={setPlayerNo} playerNo={playerNo} />}
      />
      <Route path="/Waiting" element={<Waiting />} />

      <Route path="/Difficulty" element={<Difficulty />} />
      <Route path="/Game" element={<Game playerNo={playerNo} />} />
    </Routes>
  );
}

export default App;
