import { useState, useEffect } from "react";

export default function ContactLand() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email address";
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.message) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);

    if (!validateForm()) {
      setSuccess("Please fill out all required fields correctly.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          title: formData.title,
          subject: formData.subject,
          content: formData.message,
        }),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        setSuccess("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          title: "",
          subject: "",
          message: "",
        });
      } else {
        setSuccess(`Error: ${result.message}`);
      }
    } catch (error) {
      setLoading(false);
      setSuccess("An error occurred while sending the message.");
    }
  };

  return (
    <section
      id="contact"
      className="py-5"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="container">
        <h2 className="text-center mb-4" style={{color:'#06BBCC'}}>
          Contact Us
        </h2>

        {success && (
          <div
            className={`alert ${
              success.startsWith("Error") || success.includes("Please")
                ? "alert-danger"
                : "alert-success"
            } fade show`}
            role="alert"
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            {errors.title && (
              <div className="invalid-feedback">{errors.title}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <input
              type="text"
              className={`form-control ${errors.subject ? "is-invalid" : ""}`}
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />
            {errors.subject && (
              <div className="invalid-feedback">{errors.subject}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              className={`form-control ${errors.message ? "is-invalid" : ""}`}
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
            {errors.message && (
              <div className="invalid-feedback">{errors.message}</div>
            )}
          </div>

          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ backgroundColor: "#06bbcc", color: "#fff" }}
              disabled={loading}
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
