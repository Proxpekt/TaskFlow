import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../api/authApi";

type RegisterForm = {
  username: string;
  fullname: string;
  email: string;
  password: string;
};

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = async (values: RegisterForm) => {
    setLoading(true);
    setApiError("");

    try {
      await registerApi(values);
      navigate("/login");
    } catch (err: any) {
      setApiError(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl p-10 shadow-2xl space-y-6"
      >
        <h1 className="text-3xl font-bold text-white text-center">
          Create Account 🚀
        </h1>

        {/* FULL NAME */}
        <input
          placeholder="Full Name"
          {...register("fullname", { required: "Full name required" })}
          className="w-full rounded-xl bg-white/80 px-4 py-3 outline-none focus:ring-2 focus:ring-white"
        />
        {errors.fullname && (
          <p className="text-red-200 text-sm">{errors.fullname.message}</p>
        )}

        {/* USERNAME */}
        <input
          placeholder="Username"
          {...register("username", { required: "Username required" })}
          className="w-full rounded-xl bg-white/80 px-4 py-3 outline-none focus:ring-2 focus:ring-white"
        />
        {errors.username && (
          <p className="text-red-200 text-sm">{errors.username.message}</p>
        )}

        {/* EMAIL */}
        <input
          placeholder="Email"
          {...register("email", {
            required: "Email required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email",
            },
          })}
          className="w-full rounded-xl bg-white/80 px-4 py-3 outline-none focus:ring-2 focus:ring-white"
        />
        {errors.email && (
          <p className="text-red-200 text-sm">{errors.email.message}</p>
        )}

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters",
            },
          })}
          className="w-full rounded-xl bg-white/80 px-4 py-3 outline-none focus:ring-2 focus:ring-white"
        />
        {errors.password && (
          <p className="text-red-200 text-sm">{errors.password.message}</p>
        )}

        {apiError && <p className="text-center text-red-200">{apiError}</p>}

        <button
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 transition active:scale-95"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-center text-white/80 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
