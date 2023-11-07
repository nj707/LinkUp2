import React, { useState } from 'react';

function EditEvent({ handleProf, currUser, deleteUser }) {
    const iV = {
        name: currUser.name,
        username: currUser.username,
        password: currUser.password,
        profession: currUser.profession,
    }
    const [userForm, setUserForm] = useState(iV)

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUserForm({ ...userForm, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        handleProf(userForm)
    }



    return (
        <div className="user-form">
            <form onSubmit={handleSubmit} className="update-user-form">
                <h3>Update Profile</h3>
                <label className="signup-label">Name:</label>
                <input
                    type="text"
                    name="name"
                    onChange={handleOnChange}
                    value={userForm.name}
                    className="user-form-input"
                />
                <br />
                <label className="signup-label">Username:</label>
                <input
                    type="text"
                    name="username"
                    onChange={handleOnChange}
                    value={userForm.username}
                    className="user-form-input"
                />
                <br />
                <label className="signup-label">Password:</label>
                <input
                    type="text"
                    name="password"
                    onChange={handleOnChange}
                    value={userForm.password}
                    className="user-form-input"
                />
                <br />
                <label className="signup-label">Profession:</label>
                <input
                    type="text"
                    name="profession"
                    onChange={handleOnChange}
                    value={userForm.profession}
                    className="user-form-input"
                />
                <br />
                <button type="submit" className="user-form-submit">
                    Submit
                </button>
            </form>

            <button onClick={deleteUser} className="user-form-delete">
                Delete Account
            </button>
        </div>
    )
}

export default EditEvent;