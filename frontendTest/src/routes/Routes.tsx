import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="*"
        element={
          <div>
            <h2>404 - Page Not Found</h2>
          </div>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
