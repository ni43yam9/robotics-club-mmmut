import { Suspense, lazy, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./routes/Landing/LandingPage";
import LoadingScreen from "./components/LoadingScreen";
import SideNav from "./components/SideNav";
import RobotLoader from "./components/RobotLoader";

const PlayPage = lazy(() => import("./routes/Play/PlayPage"));

export default function App() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <>
      {showLoader && (
        <RobotLoader 
          onComplete={() => {
            setShowLoader(false);
          }} 
        />
      )}
      
      {/* We keep the main content rendered underneath so it's ready when the loader fades out */}
      <SideNav />
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
    </>
  );
}
