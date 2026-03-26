import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Protected from './routes/ProtectedRoute.js'
import Result from "./pages/Result.js";
import Dashboard from "./pages/Dashboard.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected route */}
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
       <Route
  path="/result"
  element={
    <Protected>
      <Result />
    </Protected>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;