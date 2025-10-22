import { useNavigate } from "react-router-dom";
import "../styles/error.css"

function ErrorPage({ message }) {
  const navigate = useNavigate();

  return (
    <div className="error">
      <h1>Something went wrong...</h1>
      <p>{message || "An unexpected error occurred."}</p><br />
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}

export default ErrorPage;
