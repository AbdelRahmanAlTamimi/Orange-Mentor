import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditTeacher() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [teacherData, setTeacherData] = useState({
        username: '',
        email: '',
        Full_name: '',
        address: '',
        DOB: '',
        gender: '',
        phone: '',
        salary: '',
        degree: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTeacherData();
    }, [id]);

    const fetchTeacherData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/teachers/${id}`);
            setTeacherData({
                username: response.data.results.user.username,
                email: response.data.results.user.email,
                Full_name: response.data.results.user.Full_name,
                address: response.data.results.user.address,
                DOB: response.data.results.user.DOB,
                gender: response.data.results.user.gender,
                phone: response.data.results.user.phone,
                salary: response.data.results.salary,
                degree: response.data.results.degree,
            });
        } catch (error) {
            console.error('Error fetching teacher data', error);
            setError('Failed to fetch teacher data. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setImageFile(files[0]);
        } else {
            setTeacherData({ ...teacherData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'put');
        Object.keys(teacherData).forEach(key => {
            formData.append(key, teacherData[key]);
        });
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/teachersUpdate/${id}`, formData);
            console.log(response.data);
            navigate('/teachers');
        } catch (error) {
            console.error('Error updating teacher', error);
            setError('Failed to update teacher. Please try again.');
        }
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container">
            <div className="page-inner">
                <h3 className="fw-bold mb-3">Edit Teacher</h3>
                <div className="card">
                    <div className="card-header">
                        <div className="card-title">Teacher Form</div>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            {/* Your form fields here */}
                            {/* ... */}
                            <div className="form-group">
                                <label>Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            {/* ... */}
                            <div className="card-action">
                                <button type="submit" className="btn btn-success">
                                    Update Teacher
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
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