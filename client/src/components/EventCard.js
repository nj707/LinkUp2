// import React, { useState, useEffect } from 'react';


// function EventCard({ event, currUser, xurl, postFavorites, removeFavorite }) {
//     const { name, time, date, location, host, info, id, favorites } = event

//     const [evFav, setEvFav] = useState(false)
//     const [toFav, setToFav] = useState(true)


//     // function onClick(e) {
//     //     if (evFav) {
//     //         const fav_it = favorites.find((f) => f.user_id === currUser.id)
//     //         fetch(xurl + '/favorites/' + `${fav_it.id}`, {
//     //             method: 'DELETE'
//     //         })
//     //             .then((r) => {
//     //                 if (r.ok) {
//     //                     removeFavorite(fav_it.id)
//     //                     setEvFav(false)
//     //                 }
//     //             })
//     //     } else {
//     //         const data = {
//     //             user_id: currUser.id,
//     //             event_id: id,
//     //         }
//     //         fetch(xurl + '/favorites', {
//     //             method: 'POST',
//     //             headers: {
//     //                 'Content-Type': 'application/json',
//     //             },
//     //             body: JSON.stringify(data)
//     //         })
//     //             .then(r => r.json())
//     //             .then(data => postFavorites(data))
//     //     }
//     // }


//     // const [inFavorite, setInFavorite] = useState(false)
//     // function onClick(e) {
//     //     if (toFav) {
//     //         const fav_hold = favorites.find((fav) => fav.user_id === currUser.id)
//     //         fetch(`${xurl}/favorites/${fav_hold.id}`,
//     //             { method: "DELETE" })
//     //             .then((r) => {
//     //                 if (r.ok) {
//     //                     removeFavorite(fav_hold.id)
//     //                     setToFav(true)
//     //                 }
//     //             })
//     //     } else {
//     //         const data = {
//     //             user_id: currUser.id,
//     //             event_id: id,
//     //         }
//     //         fetch(`${xurl}/favorites`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
//     //             .then(r => r.json())
//     //             .then(data => postFavorites(data))
//     //     }
//     // }
//     // useEffect(() => {
//     //     if (currUser !== "") {
//     //         if (currUser.favorites.find((searchEvent) => searchEvent.event_id === id)) { setToFav(false) }
//     //     }
//     // }, [event])



//     return (
//         <div>
//             <li className="card">
//                 <h4>This is {name}. This is an event hosted by {host}</h4>
//                 <p>About : {info}</p>
//                 <p>When? On {date} at {time}</p>
//                 <p>Where? {location}</p>
//                 {toFav ? (
//                     <button onClick={onClick}  >Unfavorite</button>
//                 ) : (
//                     <button onClick={onclick} >Favorite</button>
//                 )}


//             </li>
//         </div>
//     );
// }



// export default EventCard;

import React, { useState } from 'react';

function EventCard({ event, currUser, xurl, postFavorites, removeFavorite, postSignups, removeSignup }) {
    const { id, name, time, date, location, host, info } = event;
    const isUserDefined = currUser && currUser.favorites;
    const isSuDefined = currUser && currUser.signups
    const isEventAdded = isUserDefined && currUser.favorites.some((favorite) => favorite.event_id === id);
    const isSuAdded = isSuDefined && currUser.signups.some((signup) => signup.event_id === id)
    const [isAdded, setIsAdded] = useState(isEventAdded);
    const [isSu, setIsSu] = useState(isSuAdded)

    function handleToggleProfile() {
        if (id) {
            if (isAdded) {
                const fav_hold = currUser.favorites.find((favorite) => favorite.event_id === id);
                fetch(`${xurl}/favorites/${fav_hold.id}`, { method: "DELETE" })
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
                fetch(`${xurl}/favorites`, {
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
                fetch(`${xurl}/signups/${su_hold.id}`, { method: "DELETE" })
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
                fetch(`${xurl}/signups`, {
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




    // function toggleSignup() {
    //     if (isSu) {
    //         const su_hold = currUser.signups.find((signup) => signup.event_id === id);
    //         fetch(`${xurl}/signups/${su_hold.id}`, { method: "DELETE" })
    //             .then((response) => {
    //                 if (response.ok) {
    //                     removeFavorite(fav_hold.id);
    //                     setIsAdded(false);
    //                 }
    //             });
    //     } else {
    //         const data = {
    //             user_id: currUser.id,
    //             event_id: id,
    //         };
    //         fetch(`${xurl}/favorites`, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(data)
    //         })
    //             .then((response) => {
    //                 if (response.ok) {
    //                     postFavorites(data);
    //                     setIsAdded(true);
    //                 }
    //             });
    //     }
    // }

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
                    {isSu ? "Unlist" : "Listed"}
                </button>
            </li>
        </div>
    );
}

export default EventCard;
