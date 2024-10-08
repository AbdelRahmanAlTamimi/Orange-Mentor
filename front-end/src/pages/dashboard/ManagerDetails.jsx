import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManagerDetail = () => {
    const { id } = useParams(); // Get the manager ID from the URL
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const [manager, setmanager] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchmanager = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/managers/${id}`);
                setmanager(response.data.results);
            } catch  {
                setError('Error fetching manager details');
            }
        };

        fetchmanager();
    }, [id]);

    if (error) return <div className="text-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <h3 className="text-center">Manager Details</h3>
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
                Back
            </button>
            {manager ? (
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <img
                                    src={manager.image}
                                    alt={manager.Full_name}
                                    className="img-fluid rounded-circle"
                                    style={{ maxWidth: '200px' }}
                                />
                            </div>
                            <div className="col-md-8">
                                <h5 className="card-title">{manager.Full_name}</h5>
                                <p className="card-text"><strong>Username:</strong> {manager.username}</p>
                                <p className="card-text"><strong>Email:</strong> {manager.email}</p>
                                <p className="card-text"><strong>Address:</strong> {manager.address}</p>
                                <p className="card-text"><strong>Date of Birth:</strong> {manager.DOB}</p>
                                <p className="card-text"><strong>Gender:</strong> {manager.gender}</p>
                                <p className="card-text"><strong>Phone:</strong> {manager.phone}</p>
                                <p className="card-text"><strong>Salary:</strong> {manager.salary}</p>
                                <p className="card-text"><strong>Degree:</strong> {manager.degree}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-danger">No details available for this manager.</p>
            )}
        </div>
    );
};

export default ManagerDetail;