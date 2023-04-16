import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  // Set the current user globally
  const { currentUser } = useContext(AuthContext);

  // If no current user then navigate to login page
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Primary messaging page */}
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* User Login page */}
          <Route path="login" element={<Login />} />

          {/* User registration page */}
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
