import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: 20, fontFamily: "system-ui" }}>
      <h1 style={{ margin: 0 }}>Home</h1>
      <p style={{ marginTop: 6, color: "#555" }}>Demo Home page</p>

      <Link
        to="/player"
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
        Go to Player
      </Link>
    </div>
  );
}
