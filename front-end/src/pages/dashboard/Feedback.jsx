import { useState, useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-bs5';

export default function Feedback() {
    const [feedbackData, setFeedbackData] = useState([]);
    const [newFeedback, setNewFeedback] = useState({ title: '', description: '', role: '' });
    const [editFeedback, setEditFeedback] = useState({ id: '', title: '', description: '', role: '' });

    useEffect(() => {
        fetchFeedbackData();
    }, []);

    useEffect(() => {
        if (feedbackData.length > 0) {
            $('#add-row').DataTable();
        }
    }, [feedbackData]);

    const fetchFeedbackData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/feedbacks');
            setFeedbackData(response.data);
        } catch (error) {
            console.error('Error fetching feedback data', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/feedbacksdelete/${id}`);
            setFeedbackData((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback.id !== id));
        } catch (error) {
            console.error('Error deleting feedback', error);
        }
    };

    const handleChange = (e, formType) => {
        const { name, value } = e.target;
        if (formType === 'add') {
            setNewFeedback((prev) => ({ ...prev, [name]: value }));
        } else if (formType === 'edit') {
            setEditFeedback((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleAddFeedback = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/feedbacksstore', newFeedback);
            setFeedbackData((prev) => [...prev, response.data]);
            setNewFeedback({ title: '', description: '', role: '' });
            fetchFeedbackData();
        } catch (err) {
            console.error('Error adding feedback', err);
        }
    };

    const handleEditClick = (feedback) => {
        setEditFeedback({ id: feedback.id, title: feedback.title, description: feedback.description, role: feedback.role });
    };

    const handleEditFeedback = async (e) => {
        e.preventDefault();
        try {
            const updatedFields = {
                title: editFeedback.title,
                description: editFeedback.description,
                role: editFeedback.role,
            };

            await axios.put(`http://127.0.0.1:8000/api/feedbacksupdate/${editFeedback.id}`, updatedFields);
            setFeedbackData((prev) =>
                prev.map((feedback) => (feedback.id === editFeedback.id ? { ...feedback, ...updatedFields } : feedback))
            );
            setEditFeedback({ id: '', title: '', description: '', role: '' });
        } catch (err) {
            console.error('Error editing feedback', err);
        }
    };

    return (
        <div className="container">
            <div className="page-inner">
                <div>
                    <h3 className="fw-bold mb-3">Feedback Info</h3>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex align-items-center">
                                    <h4 className="card-title">Add Feedback</h4>
                                    <button
                                        className="btn btn-primary btn-round ms-auto"
                                        data-bs-toggle="modal"
                                        data-bs-target="#addRowModal"
                                    >
                                        <i className="fa fa-plus" /> Add Feedback
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                {/* Add Feedback Modal */}
                                <div className="modal fade" id="addRowModal" tabIndex={-1} role="dialog" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header border-0">
                                                <h5 className="modal-title">
                                                    <span className="fw-mediumbold">New</span>
                                                    <span className="fw-light"> Feedback </span>
                                                </h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                            </div>
                                            <div className="modal-body">
                                                <form onSubmit={handleAddFeedback}>
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <div className="form-group form-group-default">
                                                                <label>Title</label>
                                                                <input
                                                                    name="title"
                                                                    value={newFeedback.title}
                                                                    onChange={(e) => handleChange(e, 'add')}
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Fill title"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-12">
                                                            <div className="form-group form-group-default">
                                                                <label>Description</label>
                                                                <textarea
                                                                    name="description"
                                                                    value={newFeedback.description}
                                                                    onChange={(e) => handleChange(e, 'add')}
                                                                    className="form-control"
                                                                    placeholder="Fill description"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-12">
                                                            <div className="form-group form-group-default">
                                                                <label>Role</label>
                                                                <input
                                                                    name="role"
                                                                    value={newFeedback.role}
                                                                    onChange={(e) => handleChange(e, 'add')}
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter role (student, teacher, etc.)"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer border-0">
                                                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                                                            Add
                                                        </button>
                                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                                                            Close
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Edit Feedback Modal */}
                                <div className="modal fade" id="editRowModal" tabIndex={-1} role="dialog" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header border-0">
                                                <h5 className="modal-title">
                                                    <span className="fw-mediumbold">Edit</span>
                                                    <span className="fw-light"> Feedback </span>
                                                </h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                            </div>
                                            <div className="modal-body">
                                                <form onSubmit={handleEditFeedback}>
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <div className="form-group form-group-default">
                                                                <label>Title</label>
                                                                <input
                                                                    name="title"
                                                                    value={editFeedback.title}
                                                                    onChange={(e) => handleChange(e, 'edit')}
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Fill title"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-12">
                                                            <div className="form-group form-group-default">
                                                                <label>Description</label>
                                                                <textarea
                                                                    name="description"
                                                                    value={editFeedback.description}
                                                                    onChange={(e) => handleChange(e, 'edit')}
                                                                    className="form-control"
                                                                    placeholder="Fill description"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-12">
                                                            <div className="form-group form-group-default">
                                                                <label>Role</label>
                                                                <input
                                                                    name="role"
                                                                    value={editFeedback.role}
                                                                    onChange={(e) => handleChange(e, 'edit')}
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter role"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer border-0">
                                                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                                                            Save Changes
                                                        </button>
                                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                                                            Close
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Feedback Data Table */}
                                <div className="table-responsive">
                                    <table id="add-row" className="display table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Role</th>
                                            <th style={{ width: '10%' }}>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {feedbackData.map((feedback) => (
                                            <tr key={feedback.id}>
                                                <td>{feedback.title}</td>
                                                <td>{feedback.description}</td>
                                                <td>{feedback.role}</td>
                                                <td>
                                                    <div className="form-button-action">
                                                        <button
                                                            type="button"
                                                            className="btn btn-link btn-primary btn-lg"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#editRowModal"
                                                            onClick={() => handleEditClick(feedback)}
                                                        >
                                                            <i className="fa fa-edit" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-link btn-danger"
                                                            onClick={() => handleDelete(feedback.id)}
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