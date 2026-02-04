import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Authenticated: {String(isAuthenticated)}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
