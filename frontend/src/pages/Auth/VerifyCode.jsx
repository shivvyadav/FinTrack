import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import axios from "axios";

const VerifyCode = () => {
  const { state } = useLocation();
  const { formData } = state || {};
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp || otp.length !== 6)
      return setError("Please enter the 6-digit verification code");

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/verify-otp`,
        { ...formData, otp },
      );

      if (res.data.success) {
        navigate("/login");
      } else {
        setError(res.data.message || "Invalid or expired OTP");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Verify Email">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-sm text-accent-red">{error}</p>}

        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit code"
          className="w-full px-4 py-2 text-sm tracking-widest text-center border rounded-lg bg-background text-primary border-border focus:ring-1 focus:ring-teal-500 focus:outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 font-medium text-white btn"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <span className="w-4 h-4 border-2 border-white rounded-full animate-spin border-t-transparent"></span>
              <span>Verifying...</span>
            </div>
          ) : (
            "Verify"
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default VerifyCode;
