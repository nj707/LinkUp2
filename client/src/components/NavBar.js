import React from "react";
import { Link } from "react-router-dom";


function NavBar() {



    return (
        <div className="nav-container">
            <p>
                <Link to="/" className="nav-link">Home</Link>
            </p>
            <p>
                <Link to="/login" className="nav-link">Login/Signup</Link>
            </p>
            <p>
                <Link to="/events" className="nav-link">Events</Link>
            </p>
            <Link to="/profile" className="nav-link">Profile</Link>
        </div>
    )
}

export default NavBar;