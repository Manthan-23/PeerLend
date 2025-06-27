import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home component/Home.jsx'
import {Router, Route, Routes} from 'react-router-dom'
import SignupB from './components/Signup component/SignupB.jsx'
import LoginB from './components/Signup component/LoginB.jsx'
import Dashboard from './components/dashboard component/Dashboard.jsx'
import LoginL from './components/Signup component/LoginL.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupB/>} />
        <Route path="/login" element={<LoginB/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/login-len" element={<LoginL/>} />
      </Routes>
    </>
  )
}

export default App
