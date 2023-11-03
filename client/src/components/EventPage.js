import React, { useState } from "react";
import EventList from "./EventList";
import CreateEvent from "./CreateEvent";
import { useHistory } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

// import { NavLink } from "react-router-dom";


function EventPage({ events, currUser, xurl, postFavorites, removeFavorite, postSignups, removeSignup }) {
    const history = useHistory()




    return (
        <main>
            <header>
                Event Page
                <button onClick={() => history.push('/create')}>Add Event</button>
                <Switch>
                    <Route exact path="/create">
                        <CreateEvent events={events} currUser={currUser} xurl={xurl} />
                    </Route>
                </Switch>
            </header>
            <EventList
                events={events}
                xurl={xurl}
                postFavorites={postFavorites}
                removeFavorite={removeFavorite}
                currUser={currUser}
                postSignups={postSignups}
                removeSignup={removeSignup} />

        </main>
    )
}


export default EventPage;