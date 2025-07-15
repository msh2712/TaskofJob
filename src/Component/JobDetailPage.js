import { useParams } from "react-router-dom";
import { useContext } from "react";
import { JobContext } from "./JobContext";

function JobDetailPage() {
  const { id } = useParams();
  const { job } = useContext(JobContext);

  const jobs = job.find((j) => String(j.id) === id);

  if (!jobs) return (
    <div className="w-100 d-flex justify-content-center align-items-center mt-4">
      <img src='./msh.png' className='w-25 my-2' alt="Loading or not found" />
    </div>
  );

  return (
    <div className="container my-5">
      <div className="m-5 d-flex justify-content-center align-items-center">
        <h1 className="mshtext">Job Details</h1>
      </div>
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{jobs.title}</h2>
          <h5 className="text-muted">{jobs.company} • {jobs.location}</h5>

          <div className="mt-3">
            <span className="badge bg-primary me-2">{jobs.experience_level}</span>
            <span className="badge bg-success me-2">{jobs.employment_type}</span>
            <span className="badge bg-warning text-dark">Posted on {jobs.posted_date}</span>
          </div>

          <hr />

          <h5>Description</h5>
          <ul>
          <li>{jobs.full_description}</li>
          </ul>

          <h5>Requirements</h5>
          <ul>
            <li>{jobs.requirements}</li>
          </ul>

          <p className="mt-3"><strong>Salary:</strong> {jobs.salary}</p>
        </div>
      </div>
    </div>
  );
}

export default JobDetailPage;
