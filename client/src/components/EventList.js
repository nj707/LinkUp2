import React from 'react';
import EventCard from './EventCard';

function EventList({ events }) {
    const renderEvents = events.map((event) => {
        return <EventCard key={event.id} event={event} />;
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