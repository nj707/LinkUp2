import React, { useState } from "react";
import EventList from "./EventList";
import CreateEvent from "./CreateEvent";
import { useHistory } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

// import { NavLink } from "react-router-dom";


function EventPage({ events, currUser, xurl, postFavorites, removeFavorite, postSignups, removeSignup, removeEvent, setEvents, addEvent, handleUpdateEvent }) {
    const history = useHistory()
    const [showForm, setShowForm] = useState(false)


    function handleClick() {
        setShowForm((showForm) => !showForm)
    }



    return (
        <main>
            <header>
                Event Page
                {showForm ? <CreateEvent events={events} currUser={currUser} xurl={xurl} setEvents={setEvents} addEvent={addEvent} handleClick={handleClick} /> : <> </>}
                <div className="buttonContainer">
                    <button onClick={handleClick} className="user-form-submit">Add Event</button>
                </div>





            </header>
            <EventList
                events={events}
                xurl={xurl}
                postFavorites={postFavorites}
                removeFavorite={removeFavorite}
                currUser={currUser}
                postSignups={postSignups}
                removeSignup={removeSignup}
                removeEvent={removeEvent}
                handleUpdateEvent={handleUpdateEvent} />

        </main>
    )
}


export default EventPage;