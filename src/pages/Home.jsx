import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: 16 }}>
      <h1>Home</h1>
      <p>Demo Home page</p>

      <Link to="/player">Go to Player</Link>
    </div>
  );
}
