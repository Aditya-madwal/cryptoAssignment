import { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom"; // useNavigate = redirect

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFname] = useState("");
  const [last_name, setLname] = useState("");
  const [pfp, setPfp] = useState(null);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setPfp(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password2", password2);
      formData.append("bio", bio);
      formData.append("pfp", pfp);
      console.log(formData);

      try {
        const response = await api.post("users/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data);
        navigate("/login");
      } catch (error) {
        console.error("Error:", error);
      }
      const res = await api.post("users/register", {
        username,
        password,
        password2,
        email,
        first_name,
        last_name,
        pfp,
      });

      // navigate("/login");
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
        <main>
          <div>
            <h1 className="text-2xl font-bold mb-4">Welcome to MyApp</h1>
            <p className="text-gray-600 mb-6">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              nam dolorum aliquam, quibusdam aperiam voluptatum.
            </p>

            <form action="post" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="FirstName"
                  name="first_name"
                  value={first_name}
                  onChange={(e) => setFname(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="LastName"
                  className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="LastName"
                  name="last_name"
                  value={last_name}
                  onChange={(e) => setLname(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="pfp"
                  className="block text-sm font-medium text-gray-700">
                  Upload file
                </label>
                <input
                  id="pfp"
                  type="file"
                  onChange={handleImageChange}
                  className="mt-1 block w-full text-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="PasswordConfirmation"
                  className="block text-sm font-medium text-gray-700">
                  Password Confirmation
                </label>
                <input
                  type="password"
                  id="PasswordConfirmation"
                  name="password_confirmation"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Create an account
                </button>
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    className="text-indigo-600 hover:text-indigo-700">
                    Log in
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Register;
