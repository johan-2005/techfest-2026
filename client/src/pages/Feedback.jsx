import { useState, useEffect } from "react";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${API}/api/feedback`)
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/api/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message }),
    });
    const data = await res.json();
    if (res.ok) {
      setFeedbacks([data, ...feedbacks]);
      setName("");
      setMessage("");
    }
  };

  return (
    <div className="container">
      <h2>Feedback</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          aria-label="Your name"
        />
        <textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          aria-label="Your message"
        />
        <button type="submit">Submit Feedback</button>
      </form>

      <div className="feedback-list">
        {feedbacks.map((fb) => (
          <div key={fb._id} className="card">
            {/* ========================
                XSS PREVENTION
                React auto-escapes text inside curly braces.
                If someone types <script>alert('hi')</script> it displays
                as plain text, NOT executed as HTML.
                NEVER use dangerouslySetInnerHTML with user content.
                ======================== */}
            <strong>{fb.name}</strong>
            <p>{fb.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feedback;
