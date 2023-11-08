import React, { useState, useEffect } from 'react';

function EditEvent({ event, handleUpdateEvent, handleClick, currUser }) {
    const [formData, setFormData] = useState({
        name: '',
        time: '',
        date: '',
        location: '',
        host: '',
        info: '',
        user_id: currUser.id,
    });

    useEffect(() => {
        setFormData({
            name: event.name,
            time: event.time,
            date: event.date,
            location: event.location,
            host: event.host,
            info: event.info,
            user_id: event.user_id,
        });
    }, [event]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/events/${event.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((updatedEvent) => {
                handleUpdateEvent(updatedEvent)
                handleClick()
                // for example, update the state or redirect the user
            });
    };

    return (
        <form className="user-form-container" onSubmit={handleSubmit}>
            <label className="login-label">Name:</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="login-input"
            />

            <label className="login-label">Time:</label>
            <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="login-input"
            />

            <label className="login-label">Date:</label>
            <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="login-input"
            />

            <label className="login-label">Location:</label>
            <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="login-input"
            />

            <label className="login-label">Host:</label>
            <input
                type="text"
                name="host"
                value={formData.host}
                onChange={handleInputChange}
                className="login-input"
            />

            <label className="login-label">Description:</label>
            <textarea
                name="info"
                value={formData.info}
                onChange={handleInputChange}
                className="login-input"
                style={{ height: '100px' }} // Adjust the height as needed
            />

            <button type="submit" className="user-form-submit">Update Event</button>
        </form>
    );

}

export default EditEvent;