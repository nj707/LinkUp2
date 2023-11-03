import React, { useEffect, useState } from 'react';
import EditUser from './EditUser';
import EventCard from './EventCard';
import { useHistory } from "react-router-dom";

function Profile({ xurl, setCurrentUser, currUser, removeUser, events, postFavorites, removeFavorite, }) {
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
                    removeFavorite={removeFavorite} />)
            } return null
        })
        : null



    function handleClick() {
        setShowForm((showForm) => !showForm)
    }

    const handleProf = (updProf) => {
        fetch(xurl + '/users/' + currUser.id, {
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
                    setCurrentUser(updatedUser)
                }
            })
    }

    const deleteUser = () => {
        fetch(xurl + '/users/' + currUser.id, {
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

    // useEffect(() => {
    //     if (currUser === '') { setShowEdit(false) } else { setShowEdit(true) }
    // }, [currUser])

    if (!currUser) {
        return (
            <div>
                You must have an accout to see your profile!
                <button onClick={() => history.push('/login')}>login</button>
            </div>
        )
    } else {

        return (
            <>
                {showForm ? <EditUser handleProf={handleProf} currUser={currUser} deleteUser={deleteUser} /> : <> </>}
                <div className="buttonContainer">
                    <button onClick={handleClick} className="user-form-submit">User Settings</button>
                </div>
                <div className="buttonContainer">
                    <button onClick={handleSignout} className="user-form-submit">Sign out</button>
                </div>

                <div>
                    <ul className="cards">
                        {renderFavEvents}
                    </ul>

                </div>
            </>
        )
    }

}

export default Profile;