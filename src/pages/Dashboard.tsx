import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.js";
import Button from "../components/Button.js";
import ResumeUpload from "../components/ResumeUpload.js";
import JobDescription from "../components/JobDescription.js";

const Dashboard = () => {
  const navigate = useNavigate();

  const [resume, setResume] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState<string>("");
  const [error, setError] = useState<string>(""); // ✅ NEW

  const handleSubmit = async () => {

    // ✅ Validation
    if (!jobDesc.trim()) {
      setError("Job description is required");
      return;
    }

    setError(""); // clear error

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const formData = new FormData();

    if (resume) {
      formData.append("resume", resume);
    }

    formData.append("jobDescription", jobDesc);

    try {
      const res = await fetch("http://localhost:5000/api/auth/resume", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Error");
        return;
      }

      alert("Resume uploaded successfully ✅");
      navigate("/result");

    } catch (error) {
      console.log(error);
      alert("Error sending data");
    }

    setJobDesc("");
    setResume(null);
  };

  return (
    <div>
      <Header />

      <ResumeUpload onFileSelect={setResume} />

      <JobDescription
        value={jobDesc}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setJobDesc(e.target.value);
          if (e.target.value.trim()) setError(""); // ✅ live remove error
        }}
      />

      {/* ✅ SHOW ERROR HERE */}
      {error && (
        <p className="text-red-500 text-center mt-2">{error}</p>
      )}

      <Button title="Submit" onClick={handleSubmit} />
    </div>
  );
};

export default Dashboard;