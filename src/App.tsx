import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ConnectionRequest from "./components/connection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:linkCode?" element={<ConnectionRequest />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
