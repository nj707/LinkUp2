import React from 'react';


function EventCard({ event, currUser, xurl }) {
    const { name, time, date, location, host, info } = event



    if (!currUser) {
        return (
            <div>
                <li className="card">
                    <h4>This is {name}. This is an event hosted by {host}</h4>
                    <p>About : {info}</p>
                    <p>When? On {date} at {time}</p>
                    <p>Where? {location}</p>
                </li>
            </div>
        )
    } else {
        <div>
            <li className="card">
                <h4>This is {name}. This is an event hosted by {host}</h4>
                <p>About : {info}</p>
                <p>When? On {date} at {time}</p>
                <p>Where? {location}</p>
            </li>

        </div>

    }
}

export default EventCard;

