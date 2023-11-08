import React, { useEffect, useState } from 'react';
import EditUser from './EditUser';
import EventCard from './EventCard';
import { useHistory } from "react-router-dom";

function Profile({ xurl, setCurrentUser, currUser, removeUser, events, postFavorites, removeFavorite, postSignups, removeSignup, removeEvent, addEvent, handleUpdateEvent, setEvents }) {
    const history = useHistory()
    const [showForm, setShowForm] = useState(false)



    const renderFavEvents = currUser.favorites !== undefined ?
        currUser.favorites.map((fav) => {
            const eventHold = events.filter((event) => event.id === fav.event_id)
            if (eventHold.length > 0) {
                return (<EventCard
                    key={fav.event_id}
                    event={eventHold[0]}
                    currUser={currUser}
                    xurl={xurl}
                    postFavorites={postFavorites}
                    removeFavorite={removeFavorite}
                    postSignups={postSignups}
                    removeSignup={removeSignup}
                    removeEvent={removeEvent}
                    addEvent={addEvent}
                    handleUpdateEvent={handleUpdateEvent}
                />)
            } return null
        })
        : null

    const renderSuEvents = currUser.signups !== undefined ?
        currUser.signups.map((su) => {
            const eventHold = events.filter((event) => event.id === su.event_id)
            if (eventHold.length > 0) {
                return (<EventCard
                    key={su.event_id}
                    event={eventHold[0]}
                    currUser={currUser}
                    xurl={xurl}
                    postFavorites={postFavorites}
                    removeFavorite={removeFavorite}
                    postSignups={postSignups}
                    removeSignup={removeSignup}
                    removeEvent={removeEvent}
                    addEvent={addEvent}
                    handleUpdateEvent={handleUpdateEvent} />)
            } return null
        })
        : null

    const renderMyEvents = currUser.events !== undefined ?
        currUser.events.map((ev) => {
            const eventHold = events.filter((event) => event.id === ev.id)
            if (eventHold.length > 0) {
                return (<EventCard
                    key={ev.id}
                    event={eventHold[0]}
                    currUser={currUser}
                    xurl={xurl}
                    postFavorites={postFavorites}
                    removeFavorite={removeFavorite}
                    postSignups={postSignups}
                    removeSignup={removeSignup}
                    removeEvent={removeEvent}
                    addEvent={addEvent}
                    handleUpdateEvent={handleUpdateEvent} />)
            } return null
        })
        : null




    function handleClick() {
        setShowForm((showForm) => !showForm)
    }

    const handleProf = (updProf) => {
        fetch(`/users/${currUser.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(updProf)
        })
            .then(r => {
                if (r.ok) {
                    const updatedUser = {
                        ...updProf, favorites: currUser.favorites, signups: currUser.signups, id: currUser.id
                    }
                    setEvents(events.map(event => event.userId === updatedUser.id ? { ...event, user: updatedUser } : event));
                    setCurrentUser(updatedUser)

                }
            })
    }

    const deleteUser = () => {
        fetch(`/users/${currUser.id}`, {
            method: "DELETE",
        })
            .then(r => {
                if (r.ok) {
                    removeUser(currUser)
                    setCurrentUser('')
                    history.push('/login')

                }
            })
    }

    function handleSignout(e) {
        setCurrentUser('')
        history.push('/login')
    }



    return (

        <>


            <div>
                <div className="Profile">
                    <h1>{currUser.username} </h1>
                    <div className="profile-image">
                        <img src={currUser.image} />

                    </div>
                </div>
                <ul className="cards horizontal" data-title="My Events">
                    {renderMyEvents}
                </ul>
                <ul className="cards horizontal" data-title="Favorites">
                    {renderFavEvents}
                </ul>
                <ul className="cards horizontal" data-title="Signups">
                    {renderSuEvents}
                </ul>

                <div className="button-Container-SO">
                    <button onClick={handleSignout} className="user-form-delete">Sign out</button>
                </div>

                {showForm ? <EditUser handleProf={handleProf} currUser={currUser} deleteUser={deleteUser} handleClick={handleClick} /> : <> </>}
                <div className="buttonContainer">
                    <button onClick={handleClick} className="user-form-submit">User Settings</button>
                </div>
            </div>
        </>
    )
}



export default Profile;