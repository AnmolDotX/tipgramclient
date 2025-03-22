import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import SetAvatar from "./pages/SetAvatar";
import ChatContainer from "./components/ChatContainer";
import bgvideo from "./assets/bgvideo.mp4";

const App = () => {
  return (
    <div className="bg-slate-950 bg-opacity-70 backdrop-filter backdrop-blur-lg">
      <div id="video-container">
        <video
          className="absolute h-screen w-screen object-cover object-center -z-20 opacity-20 bg-opacity-50 backdrop-filter backdrop-blur-md"
          src={bgvideo}
          muted
          autoPlay
          loop
        />
      </div>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/currentChat" element={<ChatContainer />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
      </Routes>
    </div>
  );
};

export default App;
