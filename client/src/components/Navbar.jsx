import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <Link to="/" className="nav-brand">TechFest 2026</Link>
      <div className="nav-links">
        <Link to="/events">Events</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/feedback">Feedback</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
