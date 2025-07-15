import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JobDetailPage from "./Component/JobDetailPage";
import AddNewJob from "./Component/AddNewJob";
import JobList from "./Component/JobList";
import Layout from "./Component/Layout";
import './App.css'
import { JobProvider } from "./Component/JobContext";

function App() {
  return (
    <JobProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<JobList />} />
            <Route path="/jobDetails/:id" element={<JobDetailPage />} />
            <Route path="/add-job" element={<AddNewJob />} />
          </Route>
        </Routes>
      </Router>
    </JobProvider>
  );
}

export default App;
