import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ConnectionRequest from "./components/connection";
import ConnectionSuccess from "./page/connection-Success";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:linkCode?" element={<ConnectionRequest />} />
        <Route path="/*" element={<ConnectionSuccess />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
