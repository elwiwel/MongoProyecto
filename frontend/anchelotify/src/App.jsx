import { Routes, Route, RouterProvider } from "react-router-dom";
import './App.css'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import AlbumPage from "./pages/AlbumPage";
import AudioPlayer from "./components/AudioPlayer";

function App() {


  return (
    <div>
      <div className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
          <Route path="/album/:id" element={<AlbumPage />} />
        </Routes>
      </div>
      <AudioPlayer />
    </div>
  )
}

export default App
