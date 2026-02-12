import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import TypingTest from './pages/TypingTest';
import KeystrokePractice from './pages/KeystrokePractice';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <ThemeProvider>
            <Router>
                <AppContent />
            </Router>
        </ThemeProvider>
    );
}

function AppContent() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/typing-test"
                    element={
                        <ProtectedRoute allowGuest={true}>
                            <TypingTest />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/keystroke-practice"
                    element={
                        <ProtectedRoute allowGuest={true}>
                            <KeystrokePractice />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute allowGuest={false}>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
        </div>
    );
}

export default App;