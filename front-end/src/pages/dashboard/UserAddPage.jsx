import  { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserAddPage() {
    const {roleId} = useParams();
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
        Full_name: '',
        address: '',
        DOB: '',
        phone: '',
        gender: ''
    });
    const baseApiUrl = "http://127.0.0.1:8000/api/";
    const getUserRoleTitle = (role) => {
        switch(parseInt(role)) {
            case 3:
                return 'manager';
            case 2:
                return 'supervisor';
            case 1:
                return 'teacher';
            default:
                return 'student';
        }
    };

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        try {
            Object.keys(newUser).forEach(key => {
                formData.append(key, newUser[key]);
            });
            if (image) {
                formData.append('image', image);
            }

          const response =  await axios.post(`${baseApiUrl}add_${getUserRoleTitle()}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            navigate(-1); // Go back to the previous page
        } catch (err) {
            console.error('Error adding user:', err.response ? err.response.data : err.message);



            console.log('FormData contents:');
            for (let [key, value] of formData.entries()) {
                if (value instanceof File) {
                    console.log(key, value.name);
                } else {
                    console.log(key, value);
                }
            }
        }
    };

    return (

        <div className="container mt-5">
            <h1>Add New {getUserRoleTitle(roleId)}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="Full_name"
                        className="form-control"
                        value={newUser.Full_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={newUser.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        value={newUser.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={newUser.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        className="form-control"
                        value={newUser.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        name="DOB"
                        className="form-control"
                        value={newUser.DOB}
                        onChange={handleChange}
                    />
                </div>
                {
                    roleId === '0' ?
                        <>
                            <div className="form-group">
                                <label>Parent Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    value={newUser.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Parent Name</label>
                                <input
                                    type="text"
                                    name="parent_name"
                                    className="form-control"
                                    value={newUser.parent_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>ID Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    className="form-control"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                            </div>
                        </>
                        :
                        <>
                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    value={newUser.phone}
                                    onChange={handleChange}
                                />
                            </div>

                        </>
                }
                <div className="form-group">
                    <label>Profile Image</label>
                    <input
                        type="file"
                        name="image"
                        className="form-control"
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                </div>

                <div className="form-group">
                    <label>Gender</label>
                    <select
                        name="gender"
                        className="form-control"
                        value={newUser.gender}
                        onChange={handleChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Add {getUserRoleTitle(roleId)}</button>
                <button type="button" className="btn btn-secondary mt-3 ms-2" onClick={() => navigate(-1)}>Cancel
                </button>
            </form>
        </div>
    );
}

export default UserAddPage;
