import {Routes, Route, RouterProvider} from "react-router-dom";
import './App.css'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/main" element={<Main/>}/>
    </Routes>
  )
}

export default App
