import { useState } from "react";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMsg(data.msg || "Registration complete");
    } catch {
      setMsg("Error connecting to server");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required aria-label="Name" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required aria-label="Email" />
        <input name="password" type="password" placeholder="Password (min 6 chars)" onChange={handleChange} required aria-label="Password" />
        <button type="submit">Register</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}

export default Register;
