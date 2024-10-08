import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();

    const [newStudent, setNewStudent] = useState({
        Full_name: '',
        username: '',
        email: '',
        password: '',
        address: '',
        DOB: '',
        gender: '',
        phone: '',
        image: null,
        parent_name: '',
        school_class_id: '',
        national_img: null
    });

    const [errors, setErrors] = useState({});
    // const [classes, setClasses] = useState([]);  // To store the list of classes
    //
    // useEffect(() => {
    //     // Fetch the classes list when the component mounts
    //     const fetchClasses = async () => {
    //         try {
    //             const response = await axios.get('http://127.0.0.1:8000/api/school-classes');
    //             setClasses(response.data);  // Assuming the API returns an array of class objects
    //         } catch (error) {
    //             console.error('Error fetching classes:', error);
    //         }
    //     };
    //     fetchClasses();
    // }, []);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setNewStudent(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setNewStudent(prev => ({ ...prev, [name]: value }));
        }
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!newStudent.Full_name) newErrors.Full_name = 'Full Name is required';
        if (!newStudent.username) newErrors.username = 'Username is required';
        if (!newStudent.email) newErrors.email = 'Email is required';
        if (!newStudent.password) newErrors.password = 'Password is required';
        if (!newStudent.parent_name) newErrors.parent_name = 'Parent Name is required';
        if (!newStudent.school_class_id) newErrors.school_class_id = 'School Class is required';

        return newErrors;
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formData = new FormData();
        Object.keys(newStudent).forEach(key => {
            if (newStudent[key] !== null) {
                formData.append(key, newStudent[key]);
            }
        });

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            navigate(-1);
        } catch (err) {
            console.log('Error details:', err.response ? err.response.data : err.message);
        }
    };

    return (
        <div className="container my-5">
            <div className="card shadow-sm p-4">
                <h3 className="mb-4">Add New Student</h3>
                <form onSubmit={handleAddStudent}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="Full_name"
                                value={newStudent.Full_name}
                                onChange={handleChange}
                                className={`form-control ${errors.Full_name ? 'is-invalid' : ''}`}
                                placeholder="Enter Full Name"
                            />
                            {errors.Full_name && <div className="invalid-feedback">{errors.Full_name}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                value={newStudent.username}
                                onChange={handleChange}
                                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                placeholder="Enter Username"
                            />
                            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={newStudent.email}
                                onChange={handleChange}
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                placeholder="Enter Email"
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                value={newStudent.address}
                                onChange={handleChange}
                                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                placeholder="Enter Address"
                            />
                            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={newStudent.password}
                                onChange={handleChange}
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                placeholder="Enter Password"
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                name="DOB"
                                value={newStudent.DOB}
                                onChange={handleChange}
                                className={`form-control ${errors.DOB ? 'is-invalid' : ''}`}
                            />
                            {errors.DOB && <div className="invalid-feedback">{errors.DOB}</div>}
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Gender</label>
                            <select
                                name="gender"
                                value={newStudent.gender}
                                onChange={handleChange}
                                className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={newStudent.phone}
                                onChange={handleChange}
                                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                placeholder="Enter Phone"
                            />
                            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Parent Name</label>
                            <input
                                type="text"
                                name="parent_name"
                                value={newStudent.parent_name}
                                onChange={handleChange}
                                className={`form-control ${errors.parent_name ? 'is-invalid' : ''}`}
                                placeholder="Enter Parent Name"
                            />
                            {errors.parent_name && <div className="invalid-feedback">{errors.parent_name}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>School Class ID</label>
                            <input
                                type="text"
                                name="school_class_id"
                                value={newStudent.school_class_id}
                                onChange={handleChange}
                                className={`form-control ${errors.school_class_id ? 'is-invalid' : ''}`}
                                placeholder="Enter School Class ID"
                            />
                            {errors.school_class_id && <div className="invalid-feedback">{errors.school_class_id}</div>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Profile Image</label>
                            <input
                                type="file"
                                name="image"
                                onChange={handleChange}
                                className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                            />
                            {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>National Image</label>
                            <input
                                type="file"
                                name="national_img"
                                onChange={handleChange}
                                className={`form-control ${errors.national_img ? 'is-invalid' : ''}`}
                            />
                            {errors.national_img && <div className="invalid-feedback">{errors.national_img}</div>}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}
