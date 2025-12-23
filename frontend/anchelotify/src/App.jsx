import { Routes, Route, RouterProvider } from "react-router-dom";
import './App.css'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import AlbumPage from "./pages/AlbumPage";
import AudioPlayer from "./components/AudioPlayer";
import { useState } from "react";

function App() {

  const [currentSongUrl, setcurrentSongUrl] = useState(null);
  const [currentSongImg, setCurrentSongImg] = useState(null);

  return (
    <div>
      <div className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
          <Route path="/album/:id" element={<AlbumPage setCurrentSongUrl={setcurrentSongUrl} setCurrentSongImg={setCurrentSongImg}/>} />
        </Routes>
      </div>
      <AudioPlayer audioUrl={currentSongUrl} imgSrc={currentSongImg}/>
    </div>
  )
}

export default App
