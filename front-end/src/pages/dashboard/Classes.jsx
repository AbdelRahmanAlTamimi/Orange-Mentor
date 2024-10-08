import { useState, useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-bs5';

export default function Classes() {
    const [classData, setClassData] = useState([]);
    const [newClass, setNewClass] = useState({ class_name: '' });
    const [editClass, setEditClass] = useState({ id: '', class_name: '' });

    useEffect(() => {
        fetchClassData();
    }, []);

    useEffect(() => {
        // Destroy previous DataTable instance if it exists
        if ($.fn.DataTable.isDataTable('#class-table')) {
            $('#class-table').DataTable().destroy();
        }

        // Initialize DataTable if classData is available
        if (classData.length > 0) {
            $('#class-table').DataTable();
        }
    }, [classData]);

    const fetchClassData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/class');
            console.log('Fetched class data:', response.data); // Log the fetched data
            setClassData(response.data);
        } catch (error) {
            console.error('Error fetching class data:', error.response ? error.response.data : error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/classdelete/${id}`);
            setClassData((prevClasses) => prevClasses.filter((classItem) => classItem.id !== id));
        } catch (error) {
            console.error('Error deleting class:', error.response ? error.response.data : error.message);
        }
    };

    const handleChange = (e, formType) => {
        const { name, value } = e.target;
        if (formType === 'add') {
            setNewClass((prev) => ({ ...prev, [name]: value }));
        } else if (formType === 'edit') {
            setEditClass((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleAddClass = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/classstore', newClass);
            console.log('Class added:', response.data); // Log the added class
            setClassData((prev) => [...prev, response.data]);
            setNewClass({ class_name: '' }); // Reset form
            fetchClassData(); // Optionally refresh data after adding
        } catch (error) {
            console.error('Error adding class:', error.response ? error.response.data : error.message);
        }
    };

    const handleEditClick = (classItem) => {
        setEditClass({ id: classItem.id, class_name: classItem.class_name });
    };

    const handleEditClass = async (e) => {
        e.preventDefault();
        try {
            const updatedFields = { class_name: editClass.class_name };
            await axios.put(`http://127.0.0.1:8000/api/classupdate/${editClass.id}`, updatedFields);
            console.log('Class updated:', updatedFields); // Log the updated class
            setClassData((prev) =>
                prev.map((classItem) => (classItem.id === editClass.id ? { ...classItem, ...updatedFields } : classItem))
            );
            setEditClass({ id: '', class_name: '' }); // Reset form
        } catch (error) {
            console.error('Error editing class:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="container">
            <div className="page-inner">
                <div>
                    <h3 className="fw-bold mb-3">Class Info</h3>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex align-items-center">
                                    <h4 className="card-title">Add Class</h4>
                                    <button
                                        className="btn btn-primary btn-round ms-auto"
                                        data-bs-toggle="modal"
                                        data-bs-target="#addRowModal"
                                    >
                                        <i className="fa fa-plus" /> Add Class
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                {/* Add Class Modal */}
                                <div className="modal fade" id="addRowModal" tabIndex={-1} role="dialog" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header border-0">
                                                <h5 className="modal-title">
                                                    <span className="fw-mediumbold">New</span>
                                                    <span className="fw-light"> Class </span>
                                                </h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                            </div>
                                            <div className="modal-body">
                                                <form onSubmit={handleAddClass}>
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <div className="form-group form-group-default">
                                                                <label>Class Name</label>
                                                                <input
                                                                    name="class_name"
                                                                    value={newClass.class_name}
                                                                    onChange={(e) => handleChange(e, 'add')}
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Fill class name"
                                                                    required // Make it required
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

                                {/* Edit Class Modal */}
                                <div className="modal fade" id="editRowModal" tabIndex={-1} role="dialog" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header border-0">
                                                <h5 className="modal-title">
                                                    <span className="fw-mediumbold">Edit</span>
                                                    <span className="fw-light"> Class </span>
                                                </h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                            </div>
                                            <div className="modal-body">
                                                <form onSubmit={handleEditClass}>
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <div className="form-group form-group-default">
                                                                <label>Class Name</label>
                                                                <input
                                                                    name="class_name"
                                                                    value={editClass.class_name}
                                                                    onChange={(e) => handleChange(e, 'edit')}
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Fill class name"
                                                                    required // Make it required
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

                                {/* Class Data Table */}
                                <div className="table-responsive">
                                    <table id="class-table" className="display table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>Class Name</th>
                                            <th style={{ width: '10%' }}>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {classData.map((classItem) => (
                                            <tr key={classItem.id}>
                                                <td>{classItem.class_name}</td>
                                                <td>
                                                    <div className="form-button-action">
                                                        <button
                                                            type="button"
                                                            className="btn btn-link btn-primary btn-lg"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#editRowModal"
                                                            onClick={() => handleEditClick(classItem)}
                                                        >
                                                            <i className="fa fa-edit" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-link btn-danger"
                                                            onClick={() => handleDelete(classItem.id)}
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