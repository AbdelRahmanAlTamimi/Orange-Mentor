import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentDetails = () => {
    const { id } = useParams(); // Get the student ID from the URL
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const [student, setStudent] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/student/${id}`);
                setStudent(response.data.results);
                console.log(response.data.results)
            } catch (err) {
                setError('Error fetching student details');
            }
        };

        fetchStudent();
    }, [id]);

    if (error) return <div className="text-danger">{error}</div>;
    if (!student) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <h3 className="text-center">Student Details</h3>
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
                Back
            </button>

            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-6 col-md-4">
                            <img
                                src={`http://127.0.0.1:8000/storage/images/${student.image}`}
                                alt={student.Full_name}
                                className="img-fluid rounded-circle"
                                style={{ maxWidth: '200px' }}
                            />
                        </div>
                        <div className="col-lg-6 col-md-4">
                            <img
                                src={`http://127.0.0.1:8000/storage/images/${student.image}`}
                                alt={student.Full_name}
                                className="img-fluid rounded-circle"
                                style={{ maxWidth: '200px' }}
                            />
                        </div>
                        <div className="col-md-8">
                            <h5 className="card-title">{student.Full_name}</h5>
                            <p className="card-text"><strong>Username:</strong> {student.username}</p>
                            <p className="card-text"><strong>Email:</strong> {student.email}</p>
                            <p className="card-text"><strong>Address:</strong> {student.address}</p>
                            <p className="card-text"><strong>Date of Birth:</strong> {student.DOB}</p>
                            <p className="card-text"><strong>Gender:</strong> {student.gender}</p>
                            <p className="card-text"><strong>Phone:</strong> {student.phone}</p>
                            <p className="card-text"><strong>Parent Name:</strong> {student.parent_name}</p>
                            <p className="card-text"><strong>School Class ID:</strong> {student.school_class_id}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDetails;