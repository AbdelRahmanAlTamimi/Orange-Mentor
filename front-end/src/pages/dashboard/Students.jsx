import { useState, useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-bs5';
import { useNavigate } from 'react-router-dom';

export default function Table() {
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (userData.length > 0) {
            $('#add-row').DataTable();
        }
    }, [userData]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/students');
            setUserData(response.data.results);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };



    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/studentDelete/${id}`);
            setUserData((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (error) {
            console.error('Error deleting user', error);
        }
    };

    const handleAddClick = () => {
        navigate('add');
    };

    const handleEditClick = (userId) => {
        navigate(`/user-update/${userId}`);
    };

    const handleShowMoreInfo = (userId) => {
        navigate(`${userId}`);
    };

    return (
        <div className="container">
            <div className="page-inner">
                <div>
                    <h3 className="fw-bold mb-3">Student Info</h3>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex align-items-center">
                                    <h4 className="card-title">Add Student</h4>
                                    <button
                                        className="btn btn-primary btn-round ms-auto"
                                        onClick={()=> handleAddClick()}
                                    >
                                        <i className="fa fa-plus" /> Add Student
                                    </button>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="table-responsive">
                                    <table id="add-row" className="display table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>ID</th>

                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>UserName</th>
                                            <th style={{ width: '10%' }}>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {userData.map((user) => (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>


                                                <td>{user.Full_name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.username}</td>
                                                <td>
                                                    <div className="form-button-action">

                                                            <button
                                                                type="button"
                                                                className="btn btn-link btn-primary btn-lg"
                                                                onClick={() => handleEditClick(user.id)}
                                                            >
                                                                <i className="fa fa-edit" />
                                                            </button>

                                                        <button
                                                            type="button"
                                                            className="btn btn-link btn-danger"
                                                            onClick={() => handleDelete(user.id)}
                                                        >
                                                            <i className="fa fa-times" />
                                                        </button>

                                                            <button
                                                                type="button"
                                                                className="btn btn-link btn-info"
                                                                onClick={() => handleShowMoreInfo(user.id)}
                                                            >
                                                                <i className="fa fa-eye" />
                                                            </button>

                                                    </div>
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

Table.defaultProps = {
    show: true,
    edit: true
};
