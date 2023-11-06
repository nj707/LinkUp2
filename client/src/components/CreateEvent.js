import React, { useState } from 'react';
import { useHistory } from "react-router-dom";


function CreateEvent({ currUser, setEvents, events, addEvent }) {
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
                        // setEvents(data)
                        history.push('/events')

                    })
            }
        })
    }


    return (
        <div className='new-event-form'>
            Form should be here
            <form onSubmit={handleSubmit}>
                <h2>Create Event</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Event Name"
                    onChange={handleChange}
                    value={eventForm.name}
                    className="event-form-input" />
                <input
                    type="text"
                    name="time"
                    placeholder="Event Time"
                    onChange={handleChange}
                    value={eventForm.time}
                    className="event-form-input" />
                <input
                    type="text"
                    name="date"
                    placeholder="Event Date"
                    onChange={handleChange}
                    value={eventForm.date}
                    className="event-form-input" />
                <input
                    type="text"
                    name="location"
                    placeholder="Event Location"
                    onChange={handleChange}
                    value={eventForm.location}
                    className="event-form-input" />
                <input
                    type="text"
                    name="host"
                    placeholder="Event Host"
                    onChange={handleChange}
                    value={eventForm.host}
                    className="event-form-input" />
                <input
                    type="text"
                    name="info"
                    placeholder="Event Details"
                    onChange={handleChange}
                    value={eventForm.info}
                    className="event-form-input" />
                <input
                    type="text"
                    name="user_id"
                    placeholder="id"
                    onChange={handleChange}
                    value={eventForm.user_id}
                    className="event-form-input" />

                <button type="submit">Create Event</button>


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