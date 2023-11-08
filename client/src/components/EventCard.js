
import React, { useEffect, useState } from 'react';
import EditEvent from './EditEvent';

function EventCard({ event, currUser, xurl, postFavorites, removeFavorite, postSignups, removeSignup, removeEvent, handleUpdateEvent }) {
    const { id, name, time, date, location, host, info, user_id } = event;
    const isUserDefined = currUser && currUser.favorites;
    const isSuDefined = currUser && currUser.signups
    const isEventAdded = isUserDefined && currUser.favorites.some((favorite) => favorite.event_id === id);
    const isSuAdded = isSuDefined && currUser.signups.some((signup) => signup.event_id === id)
    const [isAdded, setIsAdded] = useState(isEventAdded);
    const [isSu, setIsSu] = useState(isSuAdded)
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        setIsAdded(isUserDefined && currUser.favorites.some((favorite) => favorite.event_id === id))
    }, [currUser])

    useEffect(() => {
        setIsSu(isSuDefined && currUser.signups.some((signup) => signup.event_id === id))
    }, [currUser])

    // useEffect(() => {
    //     console.log(event)
    // }, [])


    function handleToggleProfile() {
        if (id) {
            if (isAdded) {
                const fav_hold = currUser.favorites.find((favorite) => favorite.event_id === id);
                fetch(`/favorites/${fav_hold.id}`, { method: "DELETE" })
                    .then((response) => {
                        if (response.ok) {
                            removeFavorite(fav_hold.id);
                            setIsAdded(false);
                        }
                    });
            } else {
                const data = {
                    user_id: currUser.id,
                    event_id: id,
                };
                fetch('/favorites', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                })
                    .then((response) => {
                        if (response.ok) {
                            response.json().then(favdata => {
                                console.log(favdata)
                                postFavorites(favdata);
                                setIsAdded(true);

                            })

                        }
                    });
            }
        }
    }

    function handleToggleSignup() {
        if (id) {
            if (isSu) {
                const su_hold = currUser.signups.find((signup) => signup.event_id === id);
                fetch(`/signups/${su_hold.id}`, { method: "DELETE" })
                    .then((response) => {
                        if (response.ok) {
                            removeSignup(su_hold.id, id);
                            setIsSu(false);
                        }
                    });
            } else {
                const data = {
                    user_id: currUser.id,
                    event_id: id,
                };
                fetch('/signups', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                })
                    .then((response) => {
                        if (response.ok) {
                            response.json().then(sudata => {
                                console.log(sudata)
                                postSignups(sudata);
                                setIsSu(true);

                            })

                        }
                    });
            }
        }
    }

    function deleteEvent() {
        fetch(`/events/${id}`, { method: "DELETE" })
            .then((response) => {
                if (response.ok) {
                    removeEvent(id);
                }
            });

    }
    function handleClick() {
        setShowForm((showForm) => !showForm)
    }

    function handleUser() {
        if (currUser.id === user_id) {
            return (
                <>
                    {showForm ?
                        <EditEvent event={event}
                            handleUpdateEvent={handleUpdateEvent} handleClick={handleClick} currUser={currUser} /> : <> </>

                    }
                    <button onClick={handleClick}>Edit</button>
                    <button onClick={deleteEvent}>Delete</button>
                    <p> Number of Signups: {event.signups.length}</p>
                </>
            )



        } else {
            return (
                <>

                    <button onClick={handleToggleProfile}>
                        {isAdded ? "Unfavorite" : "Favorite"}
                    </button>
                    <button onClick={handleToggleSignup}>
                        {isSu ? "Unlist" : "List"}
                    </button>
                </>
            )
        }
    }






    return (
        <div>
            <li className="card">
                <h4>{name} on {date}</h4>
                <p>hosted by {host}</p>
                <p>Location: {location}</p>
                <p>Time: {time}</p>
                <p>Info: {info}</p>
                {handleUser()}

            </li>
        </div>
    );
}

export default EventCard;
