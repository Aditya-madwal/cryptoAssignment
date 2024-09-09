import { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom"; // useNavigate = redirect
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const refreshToken = async () => {
    const reftoken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("users/userapi/token/refresh/", {
        refresh: reftoken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, String(res.data.access));
      } else {
      }
    } catch {}
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post("users/userapi/token/", {
        username,
        password,
      });
      localStorage.setItem(REFRESH_TOKEN, String(res.data.refresh));
      await refreshToken();
      navigate("/");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : null}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Login to MyApp</h1>
          <p className="text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Cupiditate, doloremque.
          </p>
        </div>

        <form action="post" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="mt-1">
              <input
                type="text"
                placeholder="Enter Username"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              No account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 hover:text-indigo-700">
                Sign up
              </Link>
            </p>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Log in
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
