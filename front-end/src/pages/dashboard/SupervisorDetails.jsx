import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SupervisorDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);





    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                setLoading(true);


                const response = await axios.get(`http://127.0.0.1:8000/api/supervisor/${id}`); // Replace with your actual API endpoint

                setUser(response.data.results);

                setLoading(false);

            }
            catch (err) {
                setError('Failed to fetch user details');
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [id]);

    // console.log(user.id)

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!user) return <div>No user data available</div>;




    return (
        <div className="container mt-5">
            <h1>Supervisor Details</h1>

            <div className="card">
                <div className="card-body">
                    <img src={`http://127.0.0.1:8000/${user.image}`} alt="user image" width="150" height="150"/>


                    <h5 className="card-title">{user.Full_name}</h5>
                    <p className="card-text"><strong>ID:</strong> {user.id}</p>
                    <p className="card-text"><strong>Email:</strong> {user.email}</p>
                    <p className="card-text"><strong>Username:</strong> {user.username}</p>
                    <p className="card-text"><strong>Address:</strong> {user.address}</p>
                    <p className="card-text"><strong>Date of birth:</strong> {user.DOB}</p>
                    <p className="card-text"><strong>Gender:</strong> {user.gender}</p>

                        <p className="card-text"><strong>Phone:</strong> {user.phone}</p>
                    {/* Add more user details as needed */}
                </div>
            </div>
            <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
                Back to Supervisor List
            </button>
        </div>
    );
}

export default SupervisorDetails;