# MongoProyecto

// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AudioPlayer from './components/AudioPlayer'; // Your player component
import Home from './pages/Home';
import About from './pages/About';
import { AudioProvider } from './context/AudioContext'; // Your context provider

function App() {
  return (
    <AudioProvider> // Wrap everything in the provider
      <Router>
        <AudioPlayer /> {/* This stays persistent */}
        <div className="content"> {/* Page content area */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* Add other routes here */}
          </Routes>
        </div>
      </Router>
    </AudioProvider>
  );
}

export default App;
