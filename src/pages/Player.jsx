import { Link, useLocation } from "react-router-dom";
import { songs } from "../data/songs";

export default function Player() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get("id");

  const song = songs.find((s) => s.id === id) || songs[0];

  return (
    <div style={{ padding: 16 }}>
      <h1>Player</h1>

      <div style={{ marginBottom: 8, opacity: 0.8 }}>
        {song.title} — {song.artist}
      </div>

      <audio controls src={song.url} style={{ width: "100%", maxWidth: 520 }} />

      <div style={{ marginTop: 12 }}>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}
