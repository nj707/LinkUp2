import React, { useState, useEffect } from 'react';

function EditEvent({ event, handleUpdateEvent, handleClick }) {
    const [formData, setFormData] = useState({
        name: '',
        time: '',
        date: '',
        location: '',
        host: '',
        info: '',
        user_id: '',
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
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Time:
                <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Date:
                <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Location:
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Host:
                <input
                    type="text"
                    name="host"
                    value={formData.host}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Description:
                <input
                    type="text"
                    name="info"
                    value={formData.info}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                User ID:
                <input
                    type="text"
                    name="user_id"
                    value={formData.user_id}
                    onChange={handleInputChange}
                />
            </label>
            <button type="submit">Update Event</button>
        </form>
    );
}

export default EditEvent;