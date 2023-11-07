import React from 'react';
import EventCard from './EventCard';

function EventList({ events, xurl, postFavorites, removeFavorite, currUser, postSignups, removeSignup, removeEvent, handleUpdateEvent }) {
    const renderEvents = events.map((event) => {
        return <EventCard key={event.id}
            event={event}
            xurl={xurl}
            postFavorites={postFavorites}
            removeFavorite={removeFavorite}
            currUser={currUser}
            postSignups={postSignups}
            removeSignup={removeSignup}
            removeEvent={removeEvent}
            handleUpdateEvent={handleUpdateEvent}
        />;
    })


    return (
        <>
            <ul className="cards">

                {renderEvents}
            </ul>
        </>
    )
}

export default EventList;