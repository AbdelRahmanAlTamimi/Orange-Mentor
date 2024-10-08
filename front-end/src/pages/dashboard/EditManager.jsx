import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditManager() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [teacherData, setTeacherData] = useState({
        username: '',
        email: '',
        Full_name: '',
        address: '',
        dob: '',
        gender: '',
        phone: '',
        image: '',

    });

    useEffect(() => {
        fetchTeacherData();
    }, []);

    const fetchTeacherData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/managers/${id}`);
            console.log(response)
            setTeacherData({
                username: response.data.results.user.username,
                email: response.data.results.user.email,
                Full_name: response.data.results.user.Full_name,
                address: response.data.results.user.address,
                dob: response.data.results.user.DOB,
                gender: response.data.results.user.gender,
                phone: response.data.results.user.phone,
                image: response.data.results.user.image,

            });
        } catch (error) {
            console.error('Error fetching manager data', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacherData({ ...teacherData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/managersUpdate/${id}`, teacherData);
            navigate('/managers');
        } catch (error) {
            console.error('Error updating manager', error);
        }
    };

    return (
        <div className="container">
            <div className="page-inner">
                <div className="page-header">
                    <h3 className="fw-bold mb-3">Edit Manager</h3>
                    <ul className="breadcrumbs mb-3">
                        <li className="nav-home">
                            <a href="#">
                                <i className="icon-home"></i>
                            </a>
                        </li>
                        <li className="separator">
                            <i className="icon-arrow-right"></i>
                        </li>
                        <li className="nav-item">
                            <a href="#">Teachers</a>
                        </li>
                        <li className="separator">
                            <i className="icon-arrow-right"></i>
                        </li>
                        <li className="nav-item">
                            <a href="#">Edit Teacher</a>
                        </li>
                    </ul>
                </div>

                <div className="card">
                    <div className="card-header">
                        <div className="card-title">Teacher Form</div>
                    </div>

                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            name="Full_name"
                                            value={teacherData.Full_name}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Full Name"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={teacherData.username}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Username"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={teacherData.email}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Email"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={teacherData.address}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Address"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Date of Birth</label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={teacherData.dob}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Gender</label>
                                        <select
                                            name="gender"
                                            value={teacherData.gender}
                                            onChange={handleChange}
                                            className="form-control"
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={teacherData.phone}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Phone Number"
                                        />
                                    </div>


                                </div>
                            </div>
                            <div className="card-action">
                                <button type="submit" className="btn btn-success">
                                    Update Teacher
                                </button>
                                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                                    Back
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}