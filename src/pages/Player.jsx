import { useRef } from "react";

export default function Player() {
  const audioRef = useRef(null);
  const demoUrl =
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  return (
    <div style={{ padding: 16 }}>
      <h1>Player</h1>
      <audio ref={audioRef} src={demoUrl} controls style={{ width: "100%" }} />
      <div style={{ marginTop: 12 }}>
        <a href="/">Back to Home</a>
      </div>
    </div>
  );
}
