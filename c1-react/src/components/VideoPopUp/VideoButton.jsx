import React, { useState } from "react";
import ModalVideo from "react-modal-video";

export default function VideoButton({ videoId }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="video-section">
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId={videoId}
        onClose={() => setOpen(false)}
      />
      <button className="video-section-btn">
        <span
          className="ak-player-btn ak-accent-color"
          onClick={() => setOpen(true)}
        >
          <span></span>
        </span>
      </button>
    </div>
  );
}
