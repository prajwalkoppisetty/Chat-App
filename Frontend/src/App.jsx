// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Signup from './../Components/Signup';
import Login from './../Components/Login';
import HomePage from './../Components/HomePage';
import Sidebar from './../Components/SideBar';

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
