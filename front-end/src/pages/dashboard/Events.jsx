import { useState, useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-bs5';

export default function Event() {
  const [eventData, setEventData] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', start_time: '', end_time: '', image: null });
  const [editEvent, setEditEvent] = useState({ id: '', title: '', description: '', start_time: '', end_time: '', image: null });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (eventData.length > 0) {
      $('#add-row').DataTable();
    }
  }, [eventData]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/events');
      setEventData(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/eventsDelete/${id}`);
      setEventData((prevEvents) => prevEvents.filter((event) => event.id !== id));
    } catch (error) {
      console.error('Error deleting event', error);
    }
  };

  const handleChange = (e, formType) => {
    const { name, value, type, files } = e.target;
    if (formType === 'add') {
      setNewEvent((prev) => ({ ...prev, [name]: type === 'file' ? files[0] : value }));
    } else if (formType === 'edit') {
      setEditEvent((prev) => ({ ...prev, [name]: type === 'file' ? files[0] : value }));
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newEvent.title);
    formData.append('description', newEvent.description);
    formData.append('start_time', newEvent.start_time);
    formData.append('end_time', newEvent.end_time);
    if (newEvent.image) {
      formData.append('image', newEvent.image);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/add_event', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setEventData((prev) => [...prev, response.data]);
      setNewEvent({ title: '', description: '', start_time: '', end_time: '', image: null });
      fetchData(); 
    } catch (err) {
      console.error('Error adding event', err);
    }
  };

  const handleEditClick = (event) => {
    setEditEvent({
      id: event.id,
      title: event.title,
      description: event.description,
      start_time: event.start_time,
      end_time: event.end_time,
      image: null 
    });
  };

  const handleEditEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (editEvent.title !== '') formData.append('title', editEvent.title);
    if (editEvent.description !== '') formData.append('description', editEvent.description);
    if (editEvent.start_time !== '') formData.append('start_time', editEvent.start_time);
    if (editEvent.end_time !== '') formData.append('end_time', editEvent.end_time);
    if (editEvent.image) {
      formData.append('image', editEvent.image);
    }

    try {
      await axios.put(`http://127.0.0.1:8000/api/eventUpdate/${editEvent.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setEventData((prev) =>
        prev.map((event) => (event.id === editEvent.id ? { ...event, ...editEvent } : event))
      );
      setEditEvent({ id: '', title: '', description: '', start_time: '', end_time: '', image: null });
    } catch (err) {
      console.error('Error editing event', err);
    }
  };

  return (
    <div className="container">
      <div className="page-inner">
        <div>
          <h3 className="fw-bold mb-3">Event Info</h3>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="d-flex align-items-center">
                  <h4 className="card-title">Add Event</h4>
                  <button
                    className="btn btn-primary btn-round ms-auto"
                    data-bs-toggle="modal"
                    data-bs-target="#addRowModal"
                  >
                    <i className="fa fa-plus" /> Add Event
                  </button>
                </div>
              </div>
              <div className="card-body">
                {/* Add Event Modal */}
                <div className="modal fade" id="addRowModal" tabIndex={-1} role="dialog" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header border-0">
                        <h5 className="modal-title">
                          <span className="fw-mediumbold">New</span>
                          <span className="fw-light"> Event </span>
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                      </div>
                      <div className="modal-body">
                        <form onSubmit={handleAddEvent}>
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="form-group form-group-default">
                                <label>Title</label>
                                <input
                                  name="title"
                                  value={newEvent.title}
                                  onChange={(e) => handleChange(e, 'add')}
                                  type="text"
                                  className="form-control"
                                  placeholder="Fill title"
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group form-group-default">
                                <label>Description</label>
                                <input
                                  name="description"
                                  value={newEvent.description}
                                  onChange={(e) => handleChange(e, 'add')}
                                  type="text"
                                  className="form-control"
                                  placeholder="Fill description"
                                />
                              </div>
                            </div>
                            <div className="col-md-6 pe-0">
                              <div className="form-group form-group-default">
                                <label>Start Time</label>
                                <input
                                  name="start_time"
                                  value={newEvent.start_time}
                                  onChange={(e) => handleChange(e, 'add')}
                                  type="datetime-local"
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group form-group-default">
                                <label>End Time</label>
                                <input
                                  name="end_time"
                                  value={newEvent.end_time}
                                  onChange={(e) => handleChange(e, 'add')}
                                  type="datetime-local"
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group form-group-default">
                                <label>Image</label>
                                <input
                                  name="image"
                                  onChange={(e) => handleChange(e, 'add')}
                                  type="file"
                                  className="form-control"
                                  accept="image/*"
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

                {/* Edit Event Modal */}
                <div className="modal fade" id="editRowModal" tabIndex={-1} role="dialog" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header border-0">
                        <h5 className="modal-title">
                          <span className="fw-mediumbold">Edit</span>
                          <span className="fw-light"> Event </span>
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                      </div>
                      <div className="modal-body">
                        <form onSubmit={handleEditEvent}>
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="form-group form-group-default">
                                <label>Title</label>
                                <input
                                  name="title"
                                  value={editEvent.title}
                                  onChange={(e) => handleChange(e, 'edit')}
                                  type="text"
                                  className="form-control"
                                  placeholder="Fill title"
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group form-group-default">
                                <label>Description</label>
                                <input
                                  name="description"
                                  value={editEvent.description}
                                  onChange={(e) => handleChange(e, 'edit')}
                                  type="text"
                                  className="form-control"
                                  placeholder="Fill description"
                                />
                              </div>
                            </div>
                            <div className="col-md-6 pe-0">
                              <div className="form-group form-group-default">
                                <label>Start Time</label>
                                <input
                                  name="start_time"
                                  value={editEvent.start_time}
                                  onChange={(e) => handleChange(e, 'edit')}
                                  type="datetime-local"
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group form-group-default">
                                <label>End Time</label>
                                <input
                                  name="end_time"
                                  value={editEvent.end_time}
                                  onChange={(e) => handleChange(e, 'edit')}
                                  type="datetime-local"
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group form-group-default">
                                <label>Image</label>
                                <input
                                  name="image"
                                  onChange={(e) => handleChange(e, 'edit')}
                                  type="file"
                                  className="form-control"
                                  accept="image/*"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer border-0">
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                              Update
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

                <table id="add-row" className="display table table-striped table-hover" style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventData.map((event) => (
                      <tr key={event.id}>
                        <td>{event.title}</td>
                        <td>{event.description}</td>
                        <td>{event.start_time}</td>
                        <td>{event.end_time}</td>
                        <td>
                           <button
                              className="btn btn-link btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#editRowModal"
                              onClick={() => handleEditClick(event)}
                            >
                              <i className="fa fa-edit" />
                            </button>
                            <button
                              className="btn btn-link btn-danger"
                              onClick={() => handleDelete(event.id)}
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
  );
}

