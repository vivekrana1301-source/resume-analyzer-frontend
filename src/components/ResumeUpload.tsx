import React, { useState } from "react";

type ResumeUploadProps = {
  onFileSelect: (file: File | null) => void;
};

const ResumeUpload = ({ onFileSelect }: ResumeUploadProps) => {
  const [fileName, setFileName] = useState<string>("");

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];

  if (!file) return; // ✅ safety check

  setFileName(file.name);
  onFileSelect(file);
};

  return (
    <div className="mt-10 flex items-center justify-center bg-white">
      <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md w-1/2">
        <h2 className="text-lg font-semibold text-gray-700 text-center">
          Upload Resume
        </h2>

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
          <p className="text-sm text-gray-600">
            Click to upload your resume
          </p>

          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {fileName && (
          <div className="bg-green-50 border border-green-300 text-green-700 text-sm p-2 rounded-md text-center">
            Uploaded: <span className="font-semibold">{fileName}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;