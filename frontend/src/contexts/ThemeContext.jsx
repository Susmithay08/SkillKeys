import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const getThemeColors = () => {
        const themes = {
            light: {
                bg: '#f8f9fa',
                card: 'rgba(255, 255, 255, 0.7)',
                text: '#1a1a1a',
                textSecondary: '#6b7280',
                primary: '#3b82f6',
                secondary: '#8b5cf6',
                success: '#10b981',
                error: '#ef4444',
                border: 'rgba(0, 0, 0, 0.1)',
            },
            dark: {
                bg: '#0f172a',
                card: 'rgba(30, 41, 59, 0.7)',
                text: '#f1f5f9',
                textSecondary: '#94a3b8',
                primary: '#60a5fa',
                secondary: '#a78bfa',
                success: '#34d399',
                error: '#f87171',
                border: 'rgba(255, 255, 255, 0.1)',
            },
            colorblind: {
                bg: '#fef9f3',
                card: 'rgba(255, 248, 240, 0.7)',
                text: '#2c1810',
                textSecondary: '#78716c',
                primary: '#0077bb',
                secondary: '#ee7733',
                success: '#009988',
                error: '#cc3311',
                border: 'rgba(0, 0, 0, 0.1)',
            },
        };
        return themes[theme];
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, colors: getThemeColors() }}>
            {children}
        </ThemeContext.Provider>
    );
};