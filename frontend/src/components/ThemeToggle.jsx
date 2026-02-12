import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

function ThemeToggle() {
    const { theme, setTheme, colors } = useTheme();

    return (
        <div className="relative">
            <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="px-3 py-2 rounded-md text-sm font-medium glass-card cursor-pointer"
                style={{
                    backgroundColor: colors.card,
                    color: colors.text,
                    border: `1px solid ${colors.border}`,
                }}
            >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="colorblind">Colorblind</option>
            </select>
        </div>
    );
}

export default ThemeToggle;