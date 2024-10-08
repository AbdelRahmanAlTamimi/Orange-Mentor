import { useState, useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-bs5';
import Swal from 'sweetalert';


export default function SubjectInfo() {
  const [subjectData, setSubjectData] = useState([]);
  const [newSubject, setNewSubject] = useState({ subject_name: '', semester: '', school_class_id: '', teacher_id: '' });
  const [editSubject, setEditSubject] = useState({ id: '', subject_name: '', semester: '', school_class_id: '', teacher_id: '' });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (subjectData.length > 0) {
      $('#add-row').DataTable();
    }
  }, [subjectData]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/subjects');
      setSubjectData(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleDelete = async (id) => {
    // Show confirmation dialog
    Swal({
      title: "Are you sure you want to delete this Subject?",
      text: "This Subject will be deleted!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          // Attempt to delete the subject
          await axios.delete(`http://127.0.0.1:8000/api/subjects/${id}`);
          

          setSubjectData((prevSubjects) => prevSubjects.filter((subject) => subject.id !== id));

          Swal("Subject deleted!", {
            icon: "success",
          });
        } catch (error) {
          console.error('Error deleting subject', error);
          

          Swal("An error occurred while deleting!", {
            icon: "error",
          });
        }
      } else {

        Swal("Deletion canceled!");
      }
    });
  };

  const handleChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'add') {
      setNewSubject((prev) => ({ ...prev, [name]: value }));
    } else if (formType === 'edit') {
      setEditSubject((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/subjects', newSubject);
      setSubjectData((prev) => [...prev, response.data]);
      setNewSubject({ subject_name: '', semester: '', school_class_id: '', teacher_id: '' });
      $('#addRowModal');
    } catch (err) {
      console.error('Error adding subject', err);
    }
  };

  const handleEditClick = (subject) => {
    setEditSubject({ id: subject.id, subject_name: subject.subject_name, semester: subject.semester, school_class_id: subject.school_class_id, teacher_id: subject.teacher_id });
  };

  const handleEditSubject = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/subjects/${editSubject.id}`, editSubject);
      setSubjectData((prev) => prev.map((subject) => (subject.id === editSubject.id ? { ...subject, ...editSubject } : subject)));
      $('#editRowModal'); // Hide the modal after editing
    } catch (err) {
      console.error('Error editing subject', err);
    }
  };

  return (
    <div className="container">
      <div className="page-inner">
        <div>
          <h3 className="fw-bold mb-3">Subject Info</h3>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="d-flex align-items-center">
                  <h4 className="card-title">Add Subject</h4>
                  <button
                    className="btn btn-primary btn-round ms-auto"
                    data-bs-toggle="modal"
                    data-bs-target="#addRowModal"
                  >
                    <i className="fa fa-plus" /> Add Subject
                  </button>
                </div>
              </div>
              <div className="card-body">
                {/* Add Subject Modal */}
                <div className="modal fade" id="addRowModal" tabIndex={-1} role="dialog" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header border-0">
                        <h5 className="modal-title">
                          <span className="fw-mediumbold">New</span>
                          <span className="fw-light"> Subject </span>
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                      </div>
                      <div className="modal-body">
                        <form onSubmit={handleAddSubject}>
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="form-group form-group-default">
                                <label>Subject Name</label>
                                <input
                                  name="subject_name"
                                  value={newSubject.subject_name}
                                  onChange={(e) => handleChange(e, 'add')}
                                  type="text"
                                  className="form-control"
                                  placeholder="Fill subject name"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-6 pe-0">
                              <div className="form-group form-group-default">
                                <label>Semester</label>
                                <input
                                  name="semester"
                                  value={newSubject.semester}
                                  onChange={(e) => handleChange(e, 'add')}
                                  type="text"
                                  className="form-control"
                                  placeholder="Fill semester"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group form-group-default">
                                <label>Class ID</label>
                                <input
                                  name="school_class_id"
                                  value={newSubject.school_class_id}
                                  onChange={(e) => handleChange(e, 'add')}
                                  type="text"
                                  className="form-control"
                                  placeholder="Fill class ID"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group form-group-default">
                                <label>Teacher ID</label>
                                <input
                                  name="teacher_id"
                                  value={newSubject.teacher_id}
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
                      <th>Subject Name</th>
                      <th>Semester</th>
                      <th>Class ID</th>
                      <th>Teacher ID</th>
                      <th style={{ width: '10%' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjectData.map((subject) => (
                      <tr key={subject.id}>
                        <td>{subject.id}</td>
                        <td>{subject.subject_name}</td>
                        <td>{subject.semester}</td>
                        <td>{subject.school_class_id}</td>
                        <td>{subject.teacher_id}</td>
                        <td>
                          <div className="form-button-action">
                            <button
                              type="button"
                              className="btn btn-link btn-primary btn-lg"
                              data-bs-toggle="modal"
                              data-bs-target="#editRowModal"
                              onClick={() => handleEditClick(subject)}
                            >
                              <i className="fa fa-edit" />
                            </button>
                            <button
                              type="button"
                              className="btn btn-link btn-danger"
                              onClick={() => handleDelete(subject.id)}
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

        {/* Edit Subject Modal */}
        <div className="modal fade" id="editRowModal" tabIndex={-1} role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title">
                  <span className="fw-mediumbold">Edit</span>
                  <span className="fw-light"> Subject </span>
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <form onSubmit={handleEditSubject}>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group form-group-default">
                        <label>Subject Name</label>
                        <input
                          name="subject_name"
                          value={editSubject.subject_name}
                          onChange={(e) => handleChange(e, 'edit')}
                          type="text"
                          className="form-control"
                          placeholder="Fill subject name"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6 pe-0">
                      <div className="form-group form-group-default">
                        <label>Semester</label>
                        <input
                          name="semester"
                          value={editSubject.semester}
                          onChange={(e) => handleChange(e, 'edit')}
                          type="text"
                          className="form-control"
                          placeholder="Fill semester"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group form-group-default">
                        <label>Class ID</label>
                        <input
                          name="school_class_id"
                          value={editSubject.school_class_id}
                          onChange={(e) => handleChange(e, 'edit')}
                          type="text"
                          className="form-control"
                          placeholder="Fill class ID"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group form-group-default">
                        <label>Teacher ID</label>
                        <input
                          name="teacher_id"
                          value={editSubject.teacher_id}
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
                    <button type="submit" className="btn btn-primary">Update</button>
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
