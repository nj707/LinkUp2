import React from "react";
import EventList from "./EventList";
// import { NavLink } from "react-router-dom";


function EventPage({ events }) {




    return (
        <main>
            Event Page
            <EventList
                events={events} />


        </main>
    )
}

export default EventPage;