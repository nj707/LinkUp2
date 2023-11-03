import React from "react";
import EventList from "./EventList";
import CreateEvent from "./CreateEvent";
import { useHistory } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

// import { NavLink } from "react-router-dom";


function EventPage({ events, currUser, xurl }) {
    const history = useHistory()



    if (!currUser) {

        return (
            <main>
                <header>Event Page</header>
                <EventList
                    events={events} />
            </main>
        )
    } else {
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
                    events={events} xurl={xurl} />
            </main>
        )
    }
}

export default EventPage;