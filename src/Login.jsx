import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utilites/UserSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // ✅ Redux se user fetch karna

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/signin", { email, password }, { withCredentials: true });

      console.log("API Response:", res.data);

      if (res.status === 200) {
        dispatch(addUser(res.data.user)); 
        console.log("Redux Store Updated:", res.data.user);
        alert("Login successful!");
        console.log(res.data.user._id)
        navigate("/dashboard", { state: { userId: res.data.user._id } });
      } else {
        alert(res.data.error || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data?.error || error.message);
      alert(error.response?.data?.error || "Error logging in. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <Link to="/signup">Register here</Link></p>

      {user && <p>Welcome, {user.email}</p>}
    </div>
  );
};

export default Login;
