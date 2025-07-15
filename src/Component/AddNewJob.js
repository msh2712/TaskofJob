import React, { useState } from 'react';
import { JobContext } from "./JobContext";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';


function AddNewJob() {
    const { job , setJobs} = useContext(JobContext);
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  const regexPatterns = {
    title: /^[a-zA-Z0-9 .,'-]{3,50}$/,
    company: /^[a-zA-Z0-9 .,'&-]{2,50}$/,
    location: /^[a-zA-Z .,'-]{2,50}$/,
    description: /^.{20,}$/,
  };

  const validateField = (name, value) => {
    if (!regexPatterns[name].test(value)) {
      switch (name) {
        case 'title':
          return 'Title should be 3-50 characters.';
        case 'company':
          return 'Company name should be 2-50 characters.';
        case 'location':
          return 'Location should be 2-50 characters.';
        case 'description':
          return 'Description should be at least 20 characters long.';
        default:
          return 'Invalid input.';
      }
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setJobs([...job ,formData])
    navigate('/')
    alert('Job posted successfully!');
    setFormData({
      title: '',
      company: '',
      location: '',
      description: '',
    });
    setErrors({});
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-dark text-white text-center py-3">
              <h3 className="mb-0">Add New Job</h3>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit} noValidate>
                {['title', 'company', 'location', 'description'].map((field) => (
                  <div className="mb-3" key={field}>
                    <label htmlFor={field} className="form-label text-capitalize">
                      {field === 'description' ? 'Job Description' : field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    {field === 'description' ? (
                      <textarea
                        className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
                        id={field}
                        name={field}
                        rows="4"
                        value={formData[field]}
                        onChange={handleChange}
                        required
                      />
                    ) : (
                      <input
                        type="text"
                        className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                      />
                    )}
                    {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
                  </div>
                ))}
                <div className="text-center">
                  <button type="submit" className="btn btn-danger w-50 p-2 mt-2 rounded-3">
                    Post Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewJob;
