export default function Home() {
  return (
    <div style={{padding: 40, fontSize: 30, color: "red"}}>
      HOME VERSION 999
    </div>
  );
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Player from "./pages/Player";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player" element={<Player />} />
      </Routes>
    </BrowserRouter>
  );
}
