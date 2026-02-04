import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md text-center space-y-6">

        <h1 className="text-6xl font-bold text-indigo-600">404</h1>

        <h2 className="text-2xl font-semibold">Page Not Found</h2>

        <p className="text-gray-500">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Go to Dashboard
        </button>

        <p
          onClick={() => navigate("/login")}
          className="text-sm text-gray-400 cursor-pointer hover:underline"
        >
          or go back to login
        </p>

      </div>
    </div>
  );
}
