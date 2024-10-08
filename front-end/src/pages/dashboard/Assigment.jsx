import { useState, useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-bs5';
import Swal from 'sweetalert';


export default function AssignmentInfo() {
  const [assignmentData, setAssignmentData] = useState([]);
  const [newAssignment, setNewAssignment] = useState({ title: '', attachment: '', teacher_id: '' });
  const [editAssignment, setEditAssignment] = useState({ id: '', title: '', attachment: '', teacher_id: '' });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (assignmentData.length > 0) {
      $('#add-row').DataTable();
    }
  }, [assignmentData]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/assigments');
      setAssignmentData(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleDelete = async (id) => {
    Swal({
      title: "Are you sure you want to delete this Assignment?",
      text: "This assignment will be deleted!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/assigments/${id}`);
          setAssignmentData((prevAssignments) => prevAssignments.filter((assignment) => assignment.id !== id));
          Swal("Assignment deleted!", { icon: "success" });
        } catch (error) {
          console.error('Error deleting assignment', error);
          Swal("An error occurred while deleting!", { icon: "error" });
        }
      } else {
        Swal("Deletion canceled!");
      }
    });
  };

  const handleChange = (e, formType) => {
    const { name, value, files } = e.target;
    if (name === 'attachment' && files.length > 0) {
      const file = files[0];

      if (file.type !== 'application/pdf') {
        Swal("Please upload a valid PDF file!", { icon: "error" });
        return;
      }
      if (formType === 'add') {
        setNewAssignment((prev) => ({ ...prev, [name]: file }));
      } else if (formType === 'edit') {
        setEditAssignment((prev) => ({ ...prev, [name]: file }));
      }
    } else {
      if (formType === 'add') {
        setNewAssignment((prev) => ({ ...prev, [name]: value }));
      } else if (formType === 'edit') {
        setEditAssignment((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  const handleAddAssignment = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newAssignment.title);
    formData.append('attachment', newAssignment.attachment);
    formData.append('teacher_id', newAssignment.teacher_id);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/assigments', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAssignmentData((prev) => [...prev, response.data]);
      setNewAssignment({ title: '', attachment: '', teacher_id: '' });
      


      Swal("Success!", "Assignment added successfully!", "success");
    } catch (err) {
      console.error('Error adding assignment', err);
      Swal("Error!", "An error occurred while adding the assignment.", "error");
    }
};

  const handleEditClick = (assignment) => {
    setEditAssignment({ id: assignment.id, title: assignment.title, attachment: assignment.attachment, teacher_id: assignment.teacher_id });
  };

  const handleEditAssignment = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', editAssignment.title);
    formData.append('attachment', editAssignment.attachment);
    formData.append('teacher_id', editAssignment.teacher_id);
    try {
      await axios.put(`http://127.0.0.1:8000/api/assigments/${editAssignment.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAssignmentData((prev) => prev.map((assignment) => (assignment.id === editAssignment.id ? { ...assignment, ...editAssignment } : assignment)));
      $('#editRowModal');
    } catch (err) {
      console.log('Error details:', err.response ? err.response.data : err.message);
      // console.error('Error editing assignment', err);
      Swal("Error updating assignment: " + err.message, { icon: "error" });
    }
  };

  return (
    <div className="container">
      <div className="page-inner">
        <div>
          <h3 className="fw-bold mb-3">Assignment Info</h3>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="d-flex align-items-center">
                  <h4 className="card-title">Add Assignment</h4>
                  <button
                    className="btn btn-primary btn-round ms-auto"
                    data-bs-toggle="modal"
                    data-bs-target="#addRowModal"
                  >
                    <i className="fa fa-plus" /> Add Assignment
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="modal fade" id="addRowModal" tabIndex={-1} role="dialog" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header border-0">
                        <h5 className="modal-title">
                          <span className="fw-mediumbold">New</span>
                          <span className="fw-light"> Assignment </span>
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                      </div>
                      <div className="modal-body">
                        <form onSubmit={handleAddAssignment}>
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="form-group form-group-default">
                                <label>Title</label>
                                <input
                                  name="title"
                                  value={newAssignment.title}
                                  onChange={(e) => handleChange(e, 'add')}
                                  type="text"
                                  className="form-control"
                                  placeholder="Fill title"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="form-group form-group-default">
                                <label>Attachment</label>
                                <input
                                  name="attachment"
                                  onChange={(e) => handleChange(e, 'add')}
                                  type="file"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group form-group-default">
                                <label>Teacher ID</label>
                                <input
                                  name="teacher_id"
                                  value={newAssignment.teacher_id}
                                  onChange={(e) => handleChange(e, 'add')}
                                  type="text"
                                  className="form-control"
                                  placeholder="Fill teacher ID"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer border-0">
                            <button type="submit" className="btn btn-primary">Add</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
                      <th>ID</th>
                      <th>Title</th>
                      <th>Attachment</th>
                      <th>Teacher ID</th>
                      <th style={{ width: '10%' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignmentData.map((assignment) => (
                      <tr key={assignment.id}>
                        <td>{assignment.id}</td>
                        <td>{assignment.title}</td>
                        <td>
                          {assignment.attachment && (
                            <a href={`http://127.0.0.1:8000/storage/${assignment.attachment}`} target="_blank" rel="noopener noreferrer">
                              View Attachment
                            </a>
                          )}
                        </td>
                        <td>{assignment.teacher_id}</td>

                        <td>
                          <div className="form-button-action">
                            <button
                              type="button"
                              className="btn btn-link btn-primary btn-lg"
                              data-bs-toggle="modal"
                              data-bs-target="#editRowModal"
                              onClick={() => handleEditClick(assignment)}
                            >
                              <i className="fa fa-edit" />
                            </button>
                            <button
                              type="button"
                              className="btn btn-link btn-danger"
                              onClick={() => handleDelete(assignment.id)}
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

        <div className="modal fade" id="editRowModal" tabIndex={-1} role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title">
                  <span className="fw-mediumbold">Edit</span>
                  <span className="fw-light"> Assignment </span>
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <form onSubmit={handleEditAssignment}>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group form-group-default">
                        <label>Title</label>
                        <input
                          name="title"
                          value={editAssignment.title}
                          onChange={(e) => handleChange(e, 'edit')}
                          type="text"
                          className="form-control"
                          placeholder="Fill title"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-group form-group-default">
                        <label>Attachment</label>
                        <input
                          name="attachment"
                          onChange={(e) => handleChange(e, 'edit')}
                          type="file"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group form-group-default">
                        <label>Teacher ID</label>
                        <input
                          name="teacher_id"
                          value={editAssignment.teacher_id}
                          onChange={(e) => handleChange(e, 'edit')}
                          type="text"
                          className="form-control"
                          placeholder="Fill teacher ID"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer border-0">
                    <button type="submit" className="btn btn-primary">Save changes</button>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}