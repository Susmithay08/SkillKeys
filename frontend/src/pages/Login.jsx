import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api';
import { useTheme } from '../contexts/ThemeContext';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { colors } = useTheme();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await login(formData);
            localStorage.setItem('token', response.data.access_token);
            localStorage.removeItem('guestMode');
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.detail || 'Login failed');
        }
    };

    const handleGuestMode = () => {
        localStorage.setItem('guestMode', 'true');
        localStorage.removeItem('token');
        navigate('/typing-test');
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
            style={{ backgroundColor: colors.bg }}
        >
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold" style={{ color: colors.text }}>
                        Sign in to your account
                    </h2>
                </div>
                <form
                    autoComplete="off"
                    className="mt-8 space-y-6 glass-card rounded-lg p-8 shadow-xl"
                    onSubmit={handleSubmit}
                    style={{ backgroundColor: colors.card, borderColor: colors.border }}
                >

                    {error && (
                        <div
                            className="px-4 py-3 rounded border"
                            style={{
                                backgroundColor: `${colors.error}20`,
                                borderColor: colors.error,
                                color: colors.error
                            }}
                        >
                            {error}
                        </div>
                    )}
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="off"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                                style={{
                                    backgroundColor: colors.bg,
                                    color: colors.text,
                                    borderColor: colors.border,
                                }}
                            />

                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                style={{
                                    backgroundColor: colors.bg,
                                    color: colors.text,
                                    borderColor: colors.border,
                                }}
                            />

                        </div>
                    </div>

                    <div className="space-y-3">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                            style={{ backgroundColor: colors.primary }}
                        >
                            Sign in
                        </button>

                        <button
                            type="button"
                            onClick={handleGuestMode}
                            className="group relative w-full flex justify-center py-2 px-4 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                            style={{
                                backgroundColor: colors.card,
                                color: colors.text,
                                borderColor: colors.border
                            }}
                        >
                            Continue as Guest
                        </button>
                    </div>

                    <div className="text-center">
                        <Link to="/register" style={{ color: colors.primary }}>
                            Don't have an account? Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;