import { Route, Routes } from "react-router-dom";
import Uploads from "./pages/uploads/page";
import Home from "./pages/home/page";

export default function App() {
  return (
    <div data-theme="nord" className="min-h-screen">
      <Routes>
        <Route path="/uploads" element={<Uploads />} />

        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
