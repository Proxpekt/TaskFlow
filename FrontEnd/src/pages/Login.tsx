import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (values: LoginForm) => {
    setLoading(true);
    setApiError("");

    try {
      const data = await loginApi(values);
      setUser(data.user);
      console.log(data)
      navigate("/dashboard");
    } catch (err: any) {
      setApiError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl p-10 shadow-2xl space-y-7 transition hover:scale-[1.01]"
      >
        <h1 className="text-3xl font-bold text-white text-center">
          Welcome Back ✨
        </h1>

        {/* EMAIL */}
        <div>
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
            <p className="text-red-200 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password required",
              minLength: {
                value: 6,
                message: "Min 6 chars",
              },
            })}
            className="w-full rounded-xl bg-white/80 px-4 py-3 outline-none focus:ring-2 focus:ring-white"
          />

          {errors.password && (
            <p className="text-red-200 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {apiError && <p className="text-center text-red-200">{apiError}</p>}

        <button
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 transition active:scale-95"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-white/80 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="underline cursor-pointer"
          >
            Register Now
          </span>
        </p>
      </form>
    </div>
  );
}
