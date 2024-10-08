import { useState, useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-bs5';
import { NavLink } from 'react-router-dom';
export default function Teachers() {
    const [teacherData, setTeacherData] = useState([]);
    // const navigate = useNavigate();
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (teacherData.length > 0) {
            $('#add-row').DataTable();
        }
    }, [teacherData]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/teachers');
            console.log(response.data.results)
            setTeacherData(response.data.results);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/teachersDelete/${id}`);
            setTeacherData((prevTeachers) => prevTeachers.filter((teacher) => teacher.id !== id));
        } catch (error) {
            console.error('Error deleting teacher', error);
        }
    };


    console.log(teacherData)


    return (

        <div className="container">
            <div className="page-inner">
                <div>
                    <h3 className="fw-bold mb-3">Teacher Info</h3>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex align-items-center">
                                    <h4 className="card-title">Add Teacher</h4>
                                    <NavLink to="add" className="btn btn-primary btn-round ms-auto">
                                        <i className="fa fa-plus" /> Add Teacher
                                    </NavLink>
                                </div>
                            </div>
                            <div className="card-body">
                                {/* Add Teacher Modal */}




                                <div className="table-responsive">
                                    <table id="add-row" className="display table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Degree</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {teacherData.map((teacher) => (

                                            <tr key={teacher.id}>
                                                <td>{teacher.username}</td>
                                                <td>{teacher.email}</td>
                                                <td>{teacher.teacher ? teacher.teacher.degree : 'N/A'}</td>
                                                <td>
                                                    <NavLink to={`edit/${teacher.id}`}>
                                                        <button className="btn btn-link btn-primary btn-lg"  >
                                                  <i className="fa fa-edit" />
                                                    </button>
                                                    </NavLink>

                                                    <NavLink to={`${teacher.id}`}>
                                                        <i className="fa fa-eye" aria-hidden="true"></i>
                                                    </NavLink>

                                                    <button
                                                    className="btn btn-link btn-danger"
                                                    onClick={() => handleDelete(teacher.id)}
                                                >
                                                    <i className="fa fa-times" />

                                                </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}