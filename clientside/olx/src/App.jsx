import { BrowserRouter, Route, Routes } from "react-router-dom"
import Nav from "./components/Nav"
import Sell from "./components/Sell"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Verify from "./components/Verify"
import Home from "./components/Home"
import Adduser from "./components/Adduser"
import EditPost from "./components/EditPost"
import Edituser from "./components/Edituser"
import Profile from "./components/Profile"
import ViewPost from "./components/ViewPost"
import { useState } from "react"
import ViewusrPost from "./components/ViewusrPost"

function App() {
  const [user, setUser] = useState("")
  return(
    <BrowserRouter>
     {user&& <Nav user={user}/>}
    <Routes>
    <Route path="/" element={<Home setUser={setUser}/>}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/signup" element={<Signup />}></Route>
    <Route path="/verify" element={<Verify/>}></Route>
    <Route path="/adduser" element={<Adduser />}></Route>
    <Route path="/profile" element={<Profile />}></Route>
    <Route path="/edituser" element={<Edituser />}></Route>
    <Route path="/sell" element={<Sell />}></Route>
    <Route path="/viewPost/:id" element={<ViewPost />}></Route>
    <Route path="/editPost/:id" element={<EditPost />}></Route>
    <Route path="/viewusrpost/:id" element={<ViewusrPost/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
