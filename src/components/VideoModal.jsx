import React from "react";
import "../App.css";

export default function VideoModal({ videoId, onClose }) {
  if (!videoId) return null;

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  return (
    <div className="modal" onClick={onClose}>
      <div className="video-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose}>✖</button>
        <iframe
          className="video-modal-iframe"
          src={embedUrl}
          title="YouTube Video"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  );
}
