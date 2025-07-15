import React, { useEffect, useState } from 'react';
import Btn from './Btn';
import { useNavigate } from 'react-router-dom';
import { JobContext } from "./JobContext";
import { useContext } from 'react';

function JobList() {
    const [allJobs, setAllJobs] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [inp, setInp] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const navigate = useNavigate()
    const { job  , loading } = useContext(JobContext);

    const [debouncemyval, setDebouncemyval] = useState(inp);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncemyval(inp);
        }, 300);

        return () => clearTimeout(handler);
    }, [inp]);

    useEffect(() => {
        setAllJobs(job);
        setJobs(job);
    }, [job]);

    const filterdrop = allJobs.reduce((acc, res) => {
        if (!acc.includes(res.location)) acc.push(res.location);
        return acc;
    }, []);

    useEffect(() => {
        let filtered = [...allJobs];

        if (selectedLocation) {
            filtered = filtered.filter(job => job.location === selectedLocation);
        }

        if (debouncemyval.trim()) {
            filtered = filtered.filter(job =>
                job.title.toLowerCase().includes(debouncemyval.toLowerCase()) ||
                (job.company && job.company.toLowerCase().includes(debouncemyval.toLowerCase()))
            );
        }

        setJobs(filtered);
    }, [debouncemyval, selectedLocation, allJobs]);

    const handledata = (job) => {
        navigate(`/jobDetails/${job}`);
    }

    if (loading) {
        return (
            <div className='w-100 height d-flex justify-content-center align-items-center'>
                <div className="spinner-border text-warning" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center my-5">All JOBS</h2>
            <div className='d-block d-sm-flex justify-content-between align-items-center py-3 px-2'>
                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {selectedLocation || "Select Location"}
                    </button>

                    <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                        style={{ maxHeight: '200px', overflowY: 'auto' }}
                    >
                        <li>
                            <button className="dropdown-item" onClick={() => setSelectedLocation('')}>
                                All Locations
                            </button>
                        </li>
                        {filterdrop.map((location, index) => (
                            <li key={index}>
                                <button className="dropdown-item" onClick={() => setSelectedLocation(location)}>
                                    {location}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <input
                    className='inp mt-2 mt-md-0'
                    onChange={(e) => setInp(e.target.value)}
                    placeholder='Search'
                    value={inp}
                />
            </div>

            <div className="row mb-5 mt-2 ">
                {jobs.length === 0 ? (
                    <div className="w-100 d-flex justify-content-center align-items-center mt-4">
                        <img src='./msh.png' className='imgchange my-2'></img>
                    </div>
                ) : (
                    jobs.map(job => (
                        <div key={job.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                            <div className="card h-100 shadow-sm maa">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{job.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                                    <p className="card-text mb-4">{job.location}</p>
                                    <div className='w-100 ' onClick={()=>handledata(job.id)}> <Btn
                                        btn="View Details"
                                    /></div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default JobList;
