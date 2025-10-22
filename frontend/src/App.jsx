import { Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import FullScreen from "./pages/FullScreen.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {
    return (
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/play/:movieId" element={<FullScreen />} />
          <Route path="/error" element={<ErrorPage />}/>
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </>
    );
  } 

export default App;
