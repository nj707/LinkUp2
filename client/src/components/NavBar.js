import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { currUserContext } from "./App";


function NavBar() {
    const userData = useContext(currUserContext)


    if (!userData) {
        return (
            <div className="nav-container">

                <Link to="/" className="nav-link">Home</Link>

                <Link to="/login" className="nav-link">Login/Signup</Link>

            </div>
        )

    } else {
        return (
            <div className="nav-container">

                <Link to="/" className="nav-link">Home</Link>

                <Link to="/events" className="nav-link">Events</Link>

                <Link to="/profile" className="nav-link">Profile</Link>
            </div>
        )
    }

}

export default NavBar;