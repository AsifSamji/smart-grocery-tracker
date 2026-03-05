import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";        // layout (Navbar + Sidebar + Outlet)
import DashboardHome from "./pages/DashboardHome"; // main dashboard content
import GroceryAdd from "./pages/GroceryAdd";
import GroceryList from "./pages/GroceryList";

import ProtectedRoute from "./components/ProtectedRoute";
import RecipePage from "./pages/RecipePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Right side content */}
          <Route index element={<DashboardHome />} />
          <Route path="add" element={<GroceryAdd />} />
          <Route path="list" element={<GroceryList />} />
          <Route path="recipe" element={<RecipePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;