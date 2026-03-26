import React, { useEffect, useState } from "react";

import type { DemoDataType } from "../types/result.js";



const Result = () => {
  const [data, setData] = useState<DemoDataType | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://localhost:5000/api/auth/latest-result",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const result = await res.json();

        setData(result.aiResult);

      } catch (err) {
        console.log("Error fetching result", err);
      }
    };

    fetchResult();
  }, []);

  if (!data) return <p className="text-center mt-10">Loading...</p>;

  const {
    overall_match_percentage,
    summary,
    skills_matching,
    required_skills_lacking_or_not_clearly_mentioned,
    preferred_skills_missing,
    strengths_for_this_role,
    experience_gap,
    what_you_should_learn_to_increase_match
  } = data;

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      {/* 🔥 Score */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6 text-center">
        <h1 className="text-4xl font-bold text-blue-600">
          {overall_match_percentage}%
        </h1>
        <p className="text-gray-600 text-lg">Resume Match Score</p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${overall_match_percentage}%` }}
          ></div>
        </div>
      </div>

      {/* ✅ Summary */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-bold text-blue-600 mb-2">
          {summary.fit_level}
        </h2>
        <p className="text-gray-600">{summary.reason}</p>
      </div>

      {/* ✅ Skills */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Skills Matching</h2>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <h3 className="font-semibold mb-2">Frontend</h3>
            <ul className="list-disc ml-6">
              {skills_matching.frontend.map((skill: string) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Backend</h3>
            <ul className="list-disc ml-6">
              {skills_matching.backend_related.map((skill: string) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Database</h3>
            <ul className="list-disc ml-6">
              {skills_matching.database.map((skill: string) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Tools</h3>
            <ul className="list-disc ml-6">
              {skills_matching.tools.map((skill: string) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ❌ Missing Skills */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4 text-red-500">
          Missing Skills
        </h2>

        <ul className="list-disc ml-6">
          {required_skills_lacking_or_not_clearly_mentioned.map((skill: string) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>

      {/* ⚠ Preferred */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4 text-orange-500">
          Preferred Skills Missing
        </h2>

        <ul className="list-disc ml-6">
          {preferred_skills_missing.map((skill: string) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>

      {/* ✅ Strengths */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4 text-green-600">
          Strengths
        </h2>

        <ul className="list-disc ml-6">
          {strengths_for_this_role.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {/* 📊 Experience */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-bold mb-2">Experience Gap</h2>

        <p><strong>Required:</strong> {experience_gap.required_experience}</p>
        <p><strong>Current:</strong> {experience_gap.current_experience}</p>
        <p className="text-red-500">
          <strong>Gap:</strong> {experience_gap.gap}
        </p>
      </div>

      {/* 📚 Learning */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">
          What You Should Learn
        </h2>

        <h3 className="font-semibold mt-3 text-red-500">High Priority</h3>
        <ul className="list-disc ml-6">
          {what_you_should_learn_to_increase_match.high_priority.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className="font-semibold mt-3 text-orange-500">Medium Priority</h3>
        <ul className="list-disc ml-6">
          {what_you_should_learn_to_increase_match.medium_priority.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className="font-semibold mt-3 text-green-600">Good to Have</h3>
        <ul className="list-disc ml-6">
          {what_you_should_learn_to_increase_match.good_to_have.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

      </div>

    </div>
  );
};

export default Result;