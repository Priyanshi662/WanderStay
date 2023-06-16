import React from "react";
import Navbar from "./components/Navbar";
import Login from "./components/user/Login"
import BottomNav from "./components/BottomNav";
import Loading from "./components/Loading";
import Notification from "./components/Notification";
const App=()=>
{
    return(
        <>
        <Loading/>
        <Notification/>
        <Navbar/>
        <Login/>
        <BottomNav/>
        </>
    )
}

export default App