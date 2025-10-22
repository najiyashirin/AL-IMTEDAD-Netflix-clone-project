import { Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import FullScreen from "./pages/FullScreen.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {
  try {
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
  } catch (err) {
    console.error("Error in App.jsx", err.message);
    return <ErrorPage message={`Something went wrong: ${err.message}`} />;
  }
}

export default App;
