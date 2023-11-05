
import React, { useEffect, useState } from 'react';

function EventCard({ event, currUser, xurl, postFavorites, removeFavorite, postSignups, removeSignup }) {
    const { id, name, time, date, location, host, info } = event;
    const isUserDefined = currUser && currUser.favorites;
    const isSuDefined = currUser && currUser.signups
    const isEventAdded = isUserDefined && currUser.favorites.some((favorite) => favorite.event_id === id);
    const isSuAdded = isSuDefined && currUser.signups.some((signup) => signup.event_id === id)
    const [isAdded, setIsAdded] = useState(isEventAdded);
    const [isSu, setIsSu] = useState(isSuAdded)

    useEffect(() => {
        setIsAdded(isUserDefined && currUser.favorites.some((favorite) => favorite.event_id === id))
    }, [currUser])

    useEffect(() => {
        setIsSu(isSuDefined && currUser.signups.some((signup) => signup.event_id === id))
    }, [currUser])


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
                            removeSignup(su_hold.id);
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






    return (
        <div>
            <li className="card">
                <h4>This is {name}. This is an event hosted by {host}</h4>
                <p>About: {info}</p>
                <p>When? On {date} at {time}</p>
                <p>Where? {location}</p>
                <button onClick={handleToggleProfile}>
                    {isAdded ? "Unfavorite" : "Favorite"}
                </button>
                <button onClick={handleToggleSignup}>
                    {isSu ? "Unlist" : "List"}
                </button>
            </li>
        </div>
    );
}

export default EventCard;
