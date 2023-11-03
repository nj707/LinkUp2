import React from 'react';
import EventCard from './EventCard';

function EventList({ events, xurl }) {
    const renderEvents = events.map((event) => {
        return <EventCard key={event.id} event={event} xurl={xurl} />;
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