import React, { useState, useContext } from 'react';
import { JobContext } from "./JobContext";
import { useNavigate } from 'react-router-dom';

function AddNewJob() {
  const { job, setJobs } = useContext(JobContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    full_description: '',
    salary: '',
    requirements: '',
    employment_type: '',
    experience_level: '',
  });

  const [myerror, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validation = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (!/^[a-zA-Z0-9 .,'-]{3,50}$/.test(formData.title)) {
      newErrors.title = "Title must be 3-50 valid characters";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    } else if (!/^[a-zA-Z0-9 .,'&-]{2,50}$/.test(formData.company)) {
      newErrors.company = "Company must be 2-50 valid characters";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    } else if (!/^[a-zA-Z .,'-]{2,50}$/.test(formData.location)) {
      newErrors.location = "Location must be 2-50 valid characters";
    }

    if (!formData.full_description.trim()) {
      newErrors.full_description = "Description is required";
    } else if (formData.full_description.length < 20) {
      newErrors.full_description = "Description must be at least 20 characters";
    }

    if (!formData.salary.trim()) {
      newErrors.salary = "Salary is required";
    }

    if (!formData.requirements.trim()) {
      newErrors.requirements = "Requirements are required";
    }

    if (!formData.employment_type.trim()) {
      newErrors.employment_type = "Employment type is required";
    }

    if (!formData.experience_level.trim()) {
      newErrors.experience_level = "Experience level is required";
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validation();
    if (Object.keys(newErrors).length === 0) {
      const newJob = {
        id: job.length + 1,
        title: formData.title,
        company: formData.company,
        location: formData.location,
        full_description: formData.full_description,
        salary: formData.salary,
        requirements: formData.requirements,
        employment_type: formData.employment_type,
        experience_level: formData.experience_level,
        posted_date: new Date().toISOString().split('T')[0],
      };

      setJobs([...job, newJob])
      alert('Job posted successfully!')
      navigate('/');

      setFormData({
        title: '',
        company: '',
        location: '',
        full_description: '',
        salary: '',
        requirements: '',
        employment_type: '',
        experience_level: '',
        tags: '',
      });
      setErrors({});
    }
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

                {[
                  { name: 'title', label: 'Title', type: 'text' },
                  { name: 'company', label: 'Company', type: 'text' },
                  { name: 'location', label: 'Location', type: 'text' },
                  { name: 'full_description', label: 'Job Description', type: 'textarea' },
                  { name: 'salary', label: 'Salary', type: 'text' },
                  { name: 'requirements', label: 'Requirements', type: 'textarea' },
                  { name: 'employment_type', label: 'Employment Type', type: 'text' },
                  { name: 'experience_level', label: 'Experience Level', type: 'text' },
                ].map(({ name, label, type }) => (
                  <div className="mb-3" key={name}>
                    <label htmlFor={name} className="form-label">{label}</label>
                    {type === 'textarea' ? (
                      <textarea
                        className={`form-control ${myerror[name] ? 'is-invalid' : ''}`}
                        id={name}
                        name={name}
                        rows="3"
                        value={formData[name]}
                        onChange={handleChange}
                      />
                    ) : (
                      <input
                        type={type}
                        className={`form-control ${myerror[name] ? 'is-invalid' : ''}`}
                        id={name}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                      />
                    )}
                    {myerror[name] && <div className="invalid-feedback">{myerror[name]}</div>}
                  </div>
                ))}

                <div className="text-center">
                  <button type="submit" className="btn btn-success w-50 p-2 mt-2 rounded-3">
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
