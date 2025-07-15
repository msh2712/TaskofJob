import React, { createContext, useState, useEffect } from "react";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [job, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(job)

  useEffect(() => {
    fetch("https://mocki.io/v1/2bd87e1e-76a3-4abd-8df4-0c8d1958cc04")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.jobs);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Failed to fetch jobs:", error);
        setLoading(false); 
      });
  }, []); 

 return (
    <JobContext.Provider value={{ job, setJobs , loading }}>
      {children}
    </JobContext.Provider>
  );
};
