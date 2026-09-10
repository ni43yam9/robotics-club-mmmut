import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./routes/Landing/LandingPage";
import LoadingScreen from "./components/LoadingScreen";

const PlayPage = lazy(() => import("./routes/Play/PlayPage"));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/play"
        element={
          <Suspense fallback={<LoadingScreen label="Loading the experience" />}>
            <PlayPage />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
