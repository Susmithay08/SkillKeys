import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');
    const guestMode = localStorage.getItem('guestMode');
    const isLoggedIn = token || guestMode === 'true';
    const { colors } = useTheme();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('guestMode');
        navigate('/login');
    };

    const handleLogoClick = () => {
        if (token) {
            navigate('/dashboard');
        } else if (guestMode === 'true') {
            navigate('/typing-test');
        } else {
            navigate('/login');
        }
    };

    return (
        <nav
            className="shadow-lg glass-card"
            style={{
                backgroundColor: colors.card,
                color: colors.text,
                borderBottom: `1px solid ${colors.border}`
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <button
                            onClick={handleLogoClick}
                            className="text-xl font-bold cursor-pointer"
                            style={{ color: colors.primary }}
                        >
                            Skill Keys
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            <>
                                <Link
                                    to="/typing-test"
                                    className="px-3 py-2 rounded-md text-sm font-medium"
                                    style={{
                                        backgroundColor: location.pathname === '/typing-test' ? colors.primary : 'transparent',
                                        color: location.pathname === '/typing-test' ? '#ffffff' : colors.text,
                                    }}
                                >
                                    Typing Test
                                </Link>
                                <Link
                                    to="/keystroke-practice"
                                    className="px-3 py-2 rounded-md text-sm font-medium"
                                    style={{
                                        backgroundColor: location.pathname === '/keystroke-practice' ? colors.primary : 'transparent',
                                        color: location.pathname === '/keystroke-practice' ? '#ffffff' : colors.text,
                                    }}
                                >
                                    Keystroke Practice
                                </Link>
                                {token && (
                                    <Link
                                        to="/dashboard"
                                        className="px-3 py-2 rounded-md text-sm font-medium"
                                        style={{
                                            backgroundColor: location.pathname === '/dashboard' ? colors.primary : 'transparent',
                                            color: location.pathname === '/dashboard' ? '#ffffff' : colors.text,
                                        }}
                                    >
                                        Dashboard
                                    </Link>
                                )}
                                <ThemeToggle />
                                <button
                                    onClick={handleLogout}
                                    className="px-3 py-2 rounded-md text-sm font-medium"
                                    style={{ color: colors.text }}
                                >
                                    {guestMode === 'true' ? 'Exit Guest' : 'Logout'}
                                </button>
                            </>
                        ) : (
                            <ThemeToggle />
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;