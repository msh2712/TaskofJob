import React, { createContext, useState, useEffect } from "react";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [job, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://mocki.io/v1/d216178d-c55e-4f1a-99a7-502c7ebaa9b2")
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
