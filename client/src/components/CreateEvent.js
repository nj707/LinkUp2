import React, { useState } from 'react';
import { useHistory } from "react-router-dom";


function CreateEvent({ currUser, setEvents, events, addEvent, handleClick }) {
    const history = useHistory()
    const iV = {
        name: "",
        time: "",
        date: '',
        location: '',
        host: currUser.name,
        info: '',
        user_id: currUser.id,
    }



    const [eventForm, setEventForm] = useState(iV)


    const handleChange = (e) => {
        const { name, value } = e.target
        setEventForm({ ...eventForm, [name]: value })
    }


    function handleSubmit(e) {
        e.preventDefault()
        fetch('/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventForm),
        }).then((r) => {
            if (r.ok) {
                r.json()
                    .then(data => {

                        addEvent(data)
                        setEventForm(iV)
                        // setCurrentUser({
                        //     ...currentUser,
                        //     events: [...currentUser.events, data],
                        // });
                        handleClick()


                    })
            }
        })
    }


    return (
        <div className='new-event-form'>

            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-label">Create Event</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Event Name"
                    onChange={handleChange}
                    value={eventForm.name}
                    className="login-input"
                />
                <input
                    type="text"
                    name="time"
                    placeholder="Event Time"
                    onChange={handleChange}
                    value={eventForm.time}
                    className="login-input"
                />
                <input
                    type="text"
                    name="date"
                    placeholder="Event Date"
                    onChange={handleChange}
                    value={eventForm.date}
                    className="login-input"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Event Location"
                    onChange={handleChange}
                    value={eventForm.location}
                    className="login-input"
                />
                <input
                    type="text"
                    name="host"
                    placeholder="Event Host"
                    onChange={handleChange}
                    value={eventForm.host}
                    className="login-input"
                />
                <textarea
                    name="info"
                    placeholder="Event Details"
                    onChange={handleChange}
                    value={eventForm.info}
                    className="login-input"
                    style={{ height: '100px' }} // Adjust the height as needed
                />

                <button type="submit" className="user-form-submit">Create Event</button>
            </form>
        </div>

    )
}

export default CreateEvent;



// const handleSubmit = (e) => {
//     e.preventDefault()
//     onAddEvent(eventForm)
//     setEventForm(iV)
//     history.push('/events')
// }

// const onAddEvent = (newEvent) => {
//     const postRequest = {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newEvent)
//     }
//     fetch('/events', postRequest)
//         .then(r => r.json())
//         .then(newEventData =>
//             setEvents([...events, newEventData]))
// }