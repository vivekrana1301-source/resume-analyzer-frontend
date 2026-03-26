import React from "react";
type ButtonProps={
  title: string;
  onClick:()=> void;
}

const Button = ({ title, onClick }:ButtonProps) => {
  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={onClick}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
      >
        {title}
      </button>
    </div>
  );
};

export default Button;