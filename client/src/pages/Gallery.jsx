import { useState, useEffect } from "react";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Sample images — replace with your real event images
const sampleImages = [
  { id: 1, title: "Opening Ceremony", src: "/images/opening.jpg" },
  { id: 2, title: "Hackathon", src: "/images/hackathon.jpg" },
  { id: 3, title: "Workshop", src: "/images/workshop.jpg" },
  { id: 4, title: "Closing Event", src: "/images/closing.jpg" },
];

function Gallery() {
  return (
    <div className="container">
      <h2>Gallery</h2>
      <div className="gallery-grid">
        {sampleImages.map((img) => (
          <div key={img.id} className="gallery-item">
            {/* ========================
                LIGHTHOUSE OPTIMIZATIONS:
                1. loading="lazy" — images load only when scrolled into view
                2. width & height — prevents Cumulative Layout Shift (CLS)
                3. alt text — accessibility and SEO score
                ======================== */}
            <img
              src={img.src}
              alt={img.title}
              loading="lazy"
              width="400"
              height="300"
            />
            <p>{img.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
