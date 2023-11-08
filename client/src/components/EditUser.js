import React, { useState } from 'react';

function EditUser({ handleProf, currUser, deleteUser, handleClick }) {
    const iV = {
        name: currUser.name,
        username: currUser.username,
        password: currUser.password,
        profession: currUser.profession,
        // image: currUser.image,
    }
    const [userForm, setUserForm] = useState(iV)
    const [photoUrl, setPhotoUrl] = useState('')

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUserForm({ ...userForm, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const updateUser = {
            ...userForm,
            image: photoUrl || userForm.image
        }
        handleProf(updateUser)
        handleClick()
    }
    function handleImage(e) {
        if (e.target.files[0]) {
            const formData = new FormData()
            formData.append('file', e.target.files[0])
            formData.append('upload_preset', 'rv4caj0t')
            formData.append('api_key', '553477135538917')

            fetch('https://api.cloudinary.com/v1_1/dvzwroul1/image/upload', {
                method: 'POST',
                body: formData,
            }).then((r) => {
                if (r.ok) {
                    r.json()
                        .then(data => {
                            setPhotoUrl(data.url)
                        })
                }
            })
        }
    }

    return (
        <div className="user-form-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h3>Update Profile</h3>
                <label className="login-label">Image:</label>
                <input
                    type="file"
                    onChange={handleImage}
                    className="login-input"
                />

                <label className="login-label">Name:</label>
                <input
                    type="text"
                    name="name"
                    onChange={handleOnChange}
                    value={userForm.name}
                    className="login-input"
                />

                <label className="login-label">Username:</label>
                <input
                    type="text"
                    name="username"
                    onChange={handleOnChange}
                    value={userForm.username}
                    className="login-input"
                />

                <label className="login-label">Password:</label>
                <input
                    type="text"
                    name="password"
                    onChange={handleOnChange}
                    value={userForm.password}
                    className="login-input"
                />

                <label className="login-label">Profession:</label>
                <input
                    type="text"
                    name="profession"
                    onChange={handleOnChange}
                    value={userForm.profession}
                    className="login-input"
                />

                <button type="submit" className="user-form-submit">Submit</button>
            </form>

            <button onClick={deleteUser} className="user-form-delete">Delete Account</button>
        </div>

    )
}


export default EditUser;