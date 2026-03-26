import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthUser = {
  name?: string;
  email?: string;
};

const Header = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const data = localStorage.getItem("auth");

    if (data) {
      const user: AuthUser = JSON.parse(data);
      setUserName(user.name || user.email || "Guest");
    }
  }, []);

  // ✅ better naming
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">

      <h1 className="text-xl font-bold text-blue-600">
        RESUME ANALYSIS
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-medium">
          {userName ? `Welcome, ${userName}` : "Guest"}
        </span>

        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

    </header>
  );
};

export default Header;