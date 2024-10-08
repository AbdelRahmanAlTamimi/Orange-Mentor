import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TeacherDetails = () => {
    const { id } = useParams(); // Get the teacher ID from the URL
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const [teacher, setTeacher] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/teachers/${id}`);
                setTeacher(response.data.results);
            } catch  {
                setError('Error fetching teacher details');
            }
        };

        fetchTeacher();
    }, [id]);

    if (error) return <div className="text-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <h3 className="text-center">Teacher Details</h3>
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
                Back
            </button>
            {teacher ? (
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <img
                                    src={`http://127.0.0.1:8000/storage/teacher/${teacher.user.image}`}
                                    alt={teacher.user.Full_name}
                                    className="img-fluid rounded-circle"
                                    style={{ maxWidth: '200px' }}
                                />
                            </div>
                            <div className="col-md-8">
                                <h5 className="card-title">{teacher.user.Full_name}</h5>
                                <p className="card-text"><strong>Username:</strong> {teacher.user.username}</p>
                                <p className="card-text"><strong>Email:</strong> {teacher.user.email}</p>
                                <p className="card-text"><strong>Address:</strong> {teacher.user.address}</p>
                                <p className="card-text"><strong>Date of Birth:</strong> {teacher.user.DOB}</p>
                                <p className="card-text"><strong>Gender:</strong> {teacher.user.gender}</p>
                                <p className="card-text"><strong>Phone:</strong> {teacher.user.phone}</p>
                                <p className="card-text"><strong>Salary:</strong> {teacher.salary}</p>
                                <p className="card-text"><strong>Degree:</strong> {teacher.degree}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-danger">No details available for this teacher.</p>
            )}
        </div>
    );
};

export default TeacherDetails;