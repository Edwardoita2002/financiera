import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaChalkboardTeacher, FaUserFriends } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SingInForm.css";

function SingInForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [selectedRole, setSelectedRole] = useState("User");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: selectedRole,
  });

  const roles = [
    { label: "User", icon: <FaUser /> },
    { label: "Employe", icon: <FaChalkboardTeacher /> },
    { label: "Admin", icon: <FaUserFriends /> },
  ];

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!loginData.email.trim()) {
      toast.error("❌ Email is required!");
      return false;
    }
    if (!emailRegex.test(loginData.email)) {
      toast.error("❌ Invalid email format!");
      return false;
    }
    if (!loginData.password.trim()) {
      toast.error("❌ Password is required!");
      return false;
    }
    if (!loginData.role) {
      toast.error("❌ Please select a role!");
      return false;
    }
    if (!roles.some((r) => r.label === loginData.role)) {
      toast.error("❌ Invalid role selected!");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const success = login(loginData); // login devuelve true/false
      if (success) {
        toast.success("✅ Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("❌ Invalid credentials or role mismatch!");
      }
    } catch (error) {
      toast.error("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = (role) => {
    switch (role) {
      case "User":
        return "Users are currently unavailable. We are working to restore access as soon as possible.";
      case "Employe":
        return "If you're an employee and don't have an account, please contact the administrator.";
      case "Admin":
        return "If you're the administrator, good luck! You have special permissions.";
      default:
        return "Please select your role.";
    }
  };

  return (
    <div className="background-wrapper">
      <div className="login-wrapper">
        <div className="left-panel">
          <h2>Tutorials</h2>
          <h1>
            Knowledge <br /> From Home
          </h1>
          <p>{renderMessage(selectedRole)}</p>
        </div>

        <div className="right-panel">
          <h2>Login</h2>
          <p>Please select your role</p>
          <div className="role-selection">
            {roles.map((role) => (
              <button
                key={role.label}
                className={`role-btn ${selectedRole === role.label ? "active" : ""}`}
                onClick={() => {
                  setSelectedRole(role.label);
                  setLoginData({ ...loginData, role: role.label });
                }}
              >
                <span className="icon">{role.icon}</span>
                {role.label}
              </button>
            ))}
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder="Type your Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Type your Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
          </div>

          <button className="login-btn" onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <Link to="/" className="forgot-password">
            You don't have a user?
          </Link>
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default SingInForm;
