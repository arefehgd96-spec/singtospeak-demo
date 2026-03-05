import { useRef, useState } from "react";

export default function Player() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const demoUrl =
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      await a.play();
      setPlaying(true);
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>Player</h1>
      <audio ref={audioRef} src={demoUrl} controls style={{ width: "100%" }} />
      <button onClick={toggle} style={{ marginTop: 12 }}>
        {playing ? "Pause" : "Play"}
      </button>
      <div style={{ marginTop: 12 }}>
        <a href="/">Back to Home</a>
      </div>
    </div>
  );
}
