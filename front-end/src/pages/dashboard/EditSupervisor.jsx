import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditSupervisor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        Full_name: '',
        email: '',
        username: '',
        password: '',
        address: '',
        DOB: '',
        phone: '',
        gender: '',
    });
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // setLoading(true);
                const response = await axios.get(`http://127.0.0.1:8000/api/supervisor/${id}`);
                setUser(response.data.results);
                // setLoading(false);
            } catch (err) {
                setError('Failed to fetch user data');
                // setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        setUser(prevUser => ({
            ...prevUser,
            [name]: type === 'checkbox' ? checked
                : type === 'file' ? files[0]
                    : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/supervisorUpdate/${id}`, user);
            navigate(-1); // Go back to the previous page
        } catch (err) {
            console.log('Error details:', err.response ? err.response.data : err.message);
            // setError(`Failed to update user: ${err.response ? err.response.data.message : err.message}`);
            // console.log('User data that failed to send:', user);
        }
    };

    // if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-5">
            <h1>Update User</h1>
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
                <button type="submit" className="btn btn-primary">Update User</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate(-1)}>Cancel</button>
            </form>
        </div>
    );
}

// Default props

export default EditSupervisor;

EditSupervisor.defaultProps = {
    getUserUrl: 'http://127.0.0.1:8000/api/supervisors',
    updateUserUrl: 'http://127.0.0.1:8000/api/supervisorUpdate'
};
