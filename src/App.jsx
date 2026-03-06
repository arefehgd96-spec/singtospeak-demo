import Home from "./pages/Home";
import Player from "./pages/Player";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player" element={<Player />} />
        <Route
          path="*"
          element={
            <div style={{ padding: 16 }}>
              <h2>Not Found</h2>
              <Link to="/">Go Home</Link>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
