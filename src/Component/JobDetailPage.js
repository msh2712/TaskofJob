import { useParams } from "react-router-dom";
import { useContext } from "react";
import { JobContext } from "./JobContext";

function JobDetailPage() {
  const { id } = useParams();
  const { job } = useContext(JobContext);

  const jobs = job.find((j) => String(j.id) === id);

  if (!jobs) return <div className="w-100 d-flex justify-content-center align-items-center mt-4">
    <img src='./msh.png' className='w-25 my-2'></img>
  </div>

  return (
    <div className="container my-5">
      <div className="m-5 d-flex justify-content-center align-items-center">
        <h1 className="mshtext">Job Detaillss</h1>
      </div>
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{jobs.title}</h2>
          <h5 className="text-muted">{jobs.company} • {job.location}</h5>

          <div className="mt-3">
            <span className="badge bg-primary me-2">{jobs.experience_level}</span>
            <span className="badge bg-success me-2">{jobs.employment_type}</span>
            <span className="badge bg-warning text-dark">Posted on {jobs.posted_date}</span>
          </div>

          <hr />

          <h5>Description</h5>
          <p>{jobs.full_description}</p>

          <h5>Requirements</h5>
          <ul>
            {jobs.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>

          <p className="mt-3"><strong>Salary:</strong> {jobs.salary}</p>

          <h5>Tags</h5>
          <div className="d-flex flex-wrap gap-2">
            {jobs.tags.map((tag, index) => (
              <span key={index} className="badge bg-secondary">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetailPage;
