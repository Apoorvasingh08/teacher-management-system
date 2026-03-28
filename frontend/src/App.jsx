import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login          from './pages/Login';
import Register       from './pages/Register';
import Dashboard      from './pages/Dashboard';
import Teachers       from './pages/Teachers';
import AuthUsers      from './pages/AuthUsers';
import AddTeacher     from './pages/AddTeacher';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar         from './components/Navbar';
import './App.css';

function WithNav({ children }) {
  return <><Navbar />{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<Navigate to="/login" />} />
        <Route path="/login"       element={<Login />} />
        <Route path="/register"    element={<Register />} />
        <Route path="/dashboard"   element={
          <ProtectedRoute><WithNav><Dashboard /></WithNav></ProtectedRoute>
        }/>
        <Route path="/teachers"    element={
          <ProtectedRoute><WithNav><Teachers /></WithNav></ProtectedRoute>
        }/>
        <Route path="/users"       element={
          <ProtectedRoute><WithNav><AuthUsers /></WithNav></ProtectedRoute>
        }/>
        <Route path="/add-teacher" element={
          <ProtectedRoute><WithNav><AddTeacher /></WithNav></ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
}