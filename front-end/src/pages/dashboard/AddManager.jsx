import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddManager() {
    const navigate = useNavigate();
    const [newManager, setNewManager] = useState({
        Full_name: '',
        username: '',
        email: '',
        password: '',
        address: '',
        DOB: '',
        gender: '',
        phone: '',
        image: null,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setNewManager((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setNewManager((prev) => ({ ...prev, [name]: value }));
        }
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleAddManager = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(newManager).forEach(key => {
            if (newManager[key] !== null) {
                formData.append(key, newManager[key]);
            }
        });

        try {
            await axios.post('http://127.0.0.1:8000/api/add_managers', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('managers');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.errors) {
                setErrors(err.response.data.errors);
            } else {
                console.error('Error adding manager', err);
            }
        }
    };

    return (
        <div className="container my-5">
            <div className="card shadow-sm p-4">
                <h3 className="mb-4">Add New Manager</h3>
                <form onSubmit={handleAddManager}>
                    {/* Full_name input */}
                    <div className="mb-3">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="Full_name"
                            value={newManager.Full_name}
                            onChange={handleChange}
                            className={`form-control ${errors.Full_name ? 'is-invalid' : ''}`}
                            placeholder="Enter Full Name"
                        />
                        {errors.Full_name && <div className="invalid-feedback">{errors.Full_name}</div>}
                    </div>

                    {/* Username input */}
                    <div className="mb-3">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={newManager.username}
                            onChange={handleChange}
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                            placeholder="Enter Username"
                        />
                        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                    </div>

                    {/* Email input */}
                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={newManager.email}
                            onChange={handleChange}
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="Enter Email"
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    {/* Password input */}
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={newManager.password}
                            onChange={handleChange}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Enter Password"
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    {/* Address input */}
                    <div className="mb-3">
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            value={newManager.address}
                            onChange={handleChange}
                            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                            placeholder="Enter Address"
                        />
                        {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                    </div>

                    {/* DOB input */}
                    <div className="mb-3">
                        <label>Date of Birth</label>
                        <input
                            type="date"
                            name="DOB"
                            value={newManager.DOB}
                            onChange={handleChange}
                            className={`form-control ${errors.DOB ? 'is-invalid' : ''}`}
                        />
                        {errors.DOB && <div className="invalid-feedback">{errors.DOB}</div>}
                    </div>

                    {/* Gender input */}
                    <div className="mb-3">
                        <label>Gender</label>
                        <select
                            name="gender"
                            value={newManager.gender}
                            onChange={handleChange}
                            className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                    </div>

                    {/* Phone input */}
                    <div className="mb-3">
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={newManager.phone}
                            onChange={handleChange}
                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                            placeholder="Enter Phone"
                        />
                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>

                    {/* Image input */}
                    <div className="mb-3">
                        <label>Image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                        />
                        {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary mt-3">Add Manager</button>
                    <button type="button" className="btn btn-secondary mt-3 ms-2" onClick={() => navigate(-1)}>
                        Back
                    </button>
                </form>
            </div>
        </div>
    );
}