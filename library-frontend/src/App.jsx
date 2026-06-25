import { useContext } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, AuthContext } from "./components/context/AuthContext";
import LoginPage from "./components/pages/LoginPage";
import AdminDashboard from "./components/pages/AdminDashboard";
import LibrarianDashboard from "./components/pages/LibrarianDashboard";
import UserDashboard from "./components/pages/UserDashboard";

function ProtectedRoute({ children, allowedRoles }) {
  const { role } = useContext(AuthContext);
  if (!role) return <Navigate to="/" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/" />;

  return children;
}

function PublicRoute({ children }) {
  const { role } = useContext(AuthContext);

  if (role) {
    if (role === "ADMIN") return <Navigate to="/admin" />;
    if (role === "LIBRARIAN") return <Navigate to="/librarian" />;
    return <Navigate to="/user" />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={["ADMIN"]}>
          <AdminDashboard />
        </ProtectedRoute>
      } />

      <Route path="/librarian" element={
        <ProtectedRoute allowedRoles={["LIBRARIAN"]}>
          <LibrarianDashboard />
        </ProtectedRoute>
      } />


      <Route path="/user" element={
        <ProtectedRoute allowedRoles={["USER"]}>
          <UserDashboard />
        </ProtectedRoute>
      } />

    </Routes>
  );
}

function App() {


  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
