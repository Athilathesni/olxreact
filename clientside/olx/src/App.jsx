import { BrowserRouter, Route, Routes } from "react-router-dom"
import Nav from "./components/Nav"

import Login from "./components/Login"
import Signup from "./components/Signup"

function App() {
  return(
    <BrowserRouter>
    <Nav/>
    <Routes>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/signup" element={<Signup />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
