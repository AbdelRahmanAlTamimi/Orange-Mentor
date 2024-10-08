import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assuming you're using axios for API calls

export default function Adminprof() {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        Full_name: '',
        email: '',
        username: '',
        password: '',
        address: '',
        DOB: '',
        phone: '',
        gender: ''
    });

    useEffect(() => {
        if (auth && auth.user) {
            setUser(prevUser => ({
                ...prevUser,
                ...auth.user,
                password: '' // Don't populate the password field
            }));
        }
    }, [auth]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://your-api-url/api/users/${auth.user.id}`, user, {
                headers: { Authorization: `Bearer ${auth.token}` }
            });

            if (response.data) {
                setAuth(prevAuth => ({
                    ...prevAuth,
                    user: response.data
                }));
                alert('Profile updated successfully!');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Your Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="Full_name" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Full_name"
                        name="Full_name"
                        value={user.Full_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Leave blank to keep current password"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={user.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="DOB" className="form-label">Date of Birth</label>
                    <input
                        type="date"
                        className="form-control"
                        id="DOB"
                        name="DOB"
                        value={user.DOB}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select
                        className="form-select"
                        id="gender"
                        name="gender"
                        value={user.gender}
                        onChange={handleChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Update Profile</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate(-1)}>Cancel</button>
            </form>
        </div>
    );
}