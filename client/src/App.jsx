import React from "react";
import Navbar from "./components/Navbar";
import Login from "./components/user/Login"
import BottomNav from "./components/BottomNav";
import Loading from "./components/Loading";
import Notification from "./components/Notification";
import Room from "./components/rooms/Room";
const App=()=>
{
    return(
        <>
            <Loading/>
            <Notification/>
            <Navbar/>
            <Login/>
            <BottomNav/>
            <Room/>
        </>
    )
}

export default App