import React, { useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import axios from "axios";
import { validateEmail, validatePassword } from "../../helpers/validation";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // 👁️ import icons

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword)
      return setError("Please fill in all fields");

    if (!validateEmail(email)) return setError("Invalid email address");
    if (!validatePassword(password))
      return setError("Password must be at least 8 characters");
    if (password !== confirmPassword) return setError("Passwords do not match");

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/send-otp`,
        { email },
      );

      if (res.data.success) {
        navigate("/verify-code", { state: { formData } });
      } else {
        setError(res.data.message || "Failed to send verification code");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Sign Up">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-accent-red text-sm">{error}</p>}

        {/* Name Field */}
        <div>
          <label className="text-primary mb-1 block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="bg-background text-primary border-border w-full rounded-lg border px-4 py-2 text-sm focus:ring-1 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="text-primary mb-1 block text-sm font-medium">
            Email
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

        {/* Password Field */}
        <div className="relative">
          <label className="text-primary mb-1 block text-sm font-medium">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="bg-background text-primary border-border w-full rounded-lg border px-4 py-2 text-sm focus:ring-1 focus:ring-teal-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-9 right-3 text-gray-500 hover:text-teal-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirm Password Field */}
        <div className="relative">
          <label className="text-primary mb-1 block text-sm font-medium">
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="bg-background text-primary border-border w-full rounded-lg border px-4 py-2 text-sm focus:ring-1 focus:ring-teal-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute top-9 right-3 text-gray-500 hover:text-teal-600"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="login-btn w-full py-2 font-medium text-white"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              <span>Signing Up...</span>
            </div>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Signup;
