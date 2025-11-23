import React, { useState, useContext } from "react";
import AuthLayout from "../../components/AuthLayout";
import axios from "axios";
import { validateEmail, validatePassword } from "../../helpers/validation";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { updateUser } = useContext(UserContext);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = formData;

    if (!email || !password) return setError("Please fill in all fields");
    if (!validateEmail(email)) return setError("Invalid email address");
    if (!validatePassword(password))
      return setError("Password must be at least 8 characters");

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true },
      );

      if (res.data.success) {
        updateUser(res.data.user);
        toast.success(res.data.message);
        navigate("/");
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Sign In">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-accent-red text-sm">{error}</p>}

        <div>
          <label className="text-primary mb-1 block text-sm font-medium">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="bg-background text-primary border-border w-full rounded-lg border px-4 py-2 text-sm focus:ring-1 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-primary mb-1 block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="bg-background text-primary border-border w-full rounded-lg border px-4 py-2 text-sm focus:ring-1 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="login-btn w-full py-2 font-medium text-white"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              <span>Signing In...</span>
            </div>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
