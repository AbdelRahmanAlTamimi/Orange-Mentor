import { useState, useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-bs5';

export default function Messages() {
    const [userData, setUserData] = useState([]);
    const [editUser, setEditUser] = useState({ id: '', name: '', email: '', password: '' });

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
            const response = await axios.get('http://127.0.0.1:8000/api/messages');
            setUserData(response.data.results);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/messageDelete/${id}`);
            setUserData((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (error) {
            console.error('Error deleting user', error);
        }
    };

    const handleEditClick = (message) => {
        setEditUser({ id: message.id, name: message.name, title: message.title, subject:message.subject,
            content:message.content , email:message.email
        });
    };




    return (
        <div className="container">
            <div className="page-inner">
                <div>
                    <h3 className="fw-bold mb-3">Messages</h3>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex align-items-center">
                                    <h4 className="card-title">All Messages</h4>

                                </div>
                            </div>
                            <div className="card-body">


                                {/* Edit User Modal */}
                                <div className="modal fade" id="editRowModal" tabIndex={-1} role="dialog" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header border-0">
                                                <h5 className="modal-title">
                                                    <span className="fw-mediumbold">Message</span>
                                                    <span className="fw-light"> Details </span>
                                                </h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                            </div>
                                            <div className="modal-body">
                                                <form>
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <div className="form-group form-group-default">
                                                                <label>Name</label>
                                                                <input
                                                                    name="name"
                                                                    value={editUser.name}
                                                                    type="text"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-12">
                                                            <div className="form-group form-group-default">
                                                                <label>Email</label>
                                                                <input
                                                                    name="email"
                                                                    value={editUser.email}
                                                                    type="email"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-12">
                                                            <div className="form-group form-group-default">
                                                                <label>title</label>
                                                                <input
                                                                    name="password"
                                                                    value={editUser.title}
                                                                    type="text"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-12">
                                                            <div className="form-group form-group-default">
                                                                <label>Subject</label>
                                                                <input
                                                                    name="password"
                                                                    value={editUser.subject}
                                                                    type="text"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-12">
                                                            <div className="form-group form-group-default">
                                <textarea name="content" id="content" className="form-control" value={editUser.content} >
                                    {editUser.content}
                                </textarea>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="modal-footer border-0">

                                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                                                            Close
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table id="add-row" className="display table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>User Name</th>
                                            <th>Title </th>
                                            <th style={{ width: '10%' }}>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {userData.map((message) => (
                                            <tr key={message.id}>
                                                <td>{message.name}</td>
                                                <td>{message.title}</td>
                                                <td>
                                                    <div className="form-button-action">
                                                        <button
                                                            type="button"
                                                            className="btn btn-link btn-primary btn-lg"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#editRowModal"
                                                            onClick={() => handleEditClick(message)}
                                                        >
                                                            <i className="fa fa-eye" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-link btn-danger"
                                                            onClick={() => handleDelete(message.id)}
                                                        >
                                                            <i className="fa fa-times" />
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