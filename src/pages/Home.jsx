export default function Home() {
  const songs = [
    { id: 1, title: "Sample Track 1", artist: "Demo Artist", href: "/player" },
    { id: 2, title: "Sample Track 2", artist: "Demo Artist", href: "/player" },
    { id: 3, title: "Sample Track 3", artist: "Demo Artist", href: "/player" },
  ];

  return (
    <div style={{ padding: 20, fontFamily: "system-ui" }}>
      <h1 style={{ margin: 0 }}>SingtoSpeak</h1>
      <p style={{ marginTop: 6, color: "#555" }}>
        Demo Home — pick a track to open the player
      </p>

      <a
        href="/player"
        style={{
          display: "inline-block",
          padding: "10px 14px",
          marginTop: 10,
          background: "#111",
          color: "#fff",
          borderRadius: 10,
          textDecoration: "none",
        }}
      >
        Open Player
      </a>

      <h3 style={{ marginTop: 24 }}>Songs</h3>
      <div style={{ display: "grid", gap: 10 }}>
        {songs.map((s) => (
          <a
            key={s.id}
            href={s.href}
            style={{
              display: "block",
              padding: 12,
              border: "1px solid #eee",
              borderRadius: 12,
              textDecoration: "none",
              color: "#111",
            }}
          >
            <div style={{ fontWeight: 600 }}>{s.title}</div>
            <div style={{ fontSize: 12, color: "#666" }}>{s.artist}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
