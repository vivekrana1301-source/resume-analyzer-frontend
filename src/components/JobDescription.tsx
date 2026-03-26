import React from "react";

type JobProps = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
};

const JobDescription = ({ value, onChange }: JobProps) => {
  return (
    <div className="mt-10 flex items-center justify-center bg-white">
      <div className="flex flex-col gap-3 p-6 bg-white rounded-lg shadow-md w-1/2">

        <h2 className="text-lg font-semibold text-gray-700">
          Job Description
        </h2>

        <textarea
          value={value}
          onChange={onChange}
          placeholder="Write or paste job description here..."
          rows={6}
          className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none w-full"
        />

      </div>
    </div>
  );
};

export default JobDescription;