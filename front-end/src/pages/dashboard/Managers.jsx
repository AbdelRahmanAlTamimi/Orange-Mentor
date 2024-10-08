import { useState, useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-bs5';
import { NavLink } from 'react-router-dom';

export default function Managers() {
    const [managerData, setManagerData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (managerData.length > 0) {
            $('#add-row').DataTable();
        }
    }, [managerData]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/managers'); // Adjusted for managers
            console.log(response.data.results);
            setManagerData(response.data.results);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/managersDelete/${id}`); // Adjusted for managers
            setManagerData((prevManagers) => prevManagers.filter((manager) => manager.id !== id));
        } catch (error) {
            console.error('Error deleting manager', error);
        }
    };

    return (
        <div className="container">
            <div className="page-inner">
                <div>
                    <h3 className="fw-bold mb-3">Manager Info</h3>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex align-items-center">
                                    <h4 className="card-title">Add Manager</h4>
                                    <NavLink to="add" className="btn btn-primary btn-round ms-auto">
                                        <i className="fa fa-plus" /> Add Manager
                                    </NavLink>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table id="add-row" className="display table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>Name</th>
                                            <th>Email</th> {/* Adjusted for managers */}
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {managerData.map((manager) => (
                                            <tr key={manager.id}>
                                                <td>{manager.Full_name}</td>
                                                <td>{manager.username}</td>
                                                <td>{manager.email}</td>
                                                <td>
                                                    <NavLink to={`edit/${manager.id}`}>
                                                        <button className="btn btn-link btn-primary btn-lg">
                                                            <i className="fa fa-edit" />
                                                        </button>
                                                    </NavLink>
                                                    <NavLink to={`${manager.id}`}>
                                                        <i className="fa fa-eye" aria-hidden="true"></i>
                                                    </NavLink>
                                                    <button
                                                        className="btn btn-link btn-danger"
                                                        onClick={() => handleDelete(manager.id)}
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