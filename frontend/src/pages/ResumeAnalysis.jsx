import React, { useState } from 'react';
import api from '../api/axios';

const ResumeAnalysis = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();

    formData.append("resume", file);

    try {
      const res = await api.post(
        "/resume/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">
        Resume ATS Analyzer
      </h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        className="btn-primary ml-4"
      >
        Analyze Resume
      </button>

      {result && (
        <div className="mt-10 space-y-6">

          <div className="card">
            <h2 className="text-2xl font-bold">
              ATS Score: {result.atsScore}%
            </h2>
          </div>

          <div className="card">
            <h2 className="font-bold text-xl mb-3">
              Skills Found
            </h2>

            <div className="flex flex-wrap gap-2">
              {result.foundSkills.map((skill) => (
                <span
                  key={skill}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="font-bold text-xl mb-3">
              Missing Skills
            </h2>

            <div className="flex flex-wrap gap-2">
              {result.missingSkills.map((skill) => (
                <span
                  key={skill}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="font-bold text-xl mb-3">
              Suggestions
            </h2>

            <ul className="list-disc ml-6">
              {result.suggestions.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
};

export default ResumeAnalysis;