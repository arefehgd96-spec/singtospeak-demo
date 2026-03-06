export default function Home() {
  return (
    <div style={{padding: 40, fontSize: 30, color: "red"}}>
      HOME VERSION 999
    </div>
  );
}
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { songs } from "../data/songs";

export default function Home() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return songs;
    return songs.filter(
      (x) =>
        x.title.toLowerCase().includes(s) ||
        x.artist.toLowerCase().includes(s)
    );
  }, [q]);

  const openPlayer = (song) => {
 https://filesamples.com/samples/audio/mp3/sample2.mp3"
    navigate(/player?id=${encodeURIComponent(song.id)});
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>Home</h1>

      <div style={{ margin: "12px 0" }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search song or artist..."
          style={{ padding: 10, width: "100%", maxWidth: 420 }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <Link to="/player">Go to Player</Link>
      </div>

      <h3>Songs</h3>
      <div style={{ display: "grid", gap: 10, maxWidth: 520 }}>
        {filtered.map((song) => (
          <button
            key={song.id}
            onClick={() => openPlayer(song)}
            style={{
              textAlign: "left",
              padding: 12,
              border: "1px solid #ddd",
              borderRadius: 10,
              background: "white",
              cursor: "pointer",
            }}
          >
            <div style={{ fontWeight: 600 }}>{song.title}</div>
            <div style={{ opacity: 0.7 }}>{song.artist}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
