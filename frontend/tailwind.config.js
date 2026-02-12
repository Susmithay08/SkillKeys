/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Light theme
                light: {
                    bg: '#f8f9fa',
                    card: 'rgba(255, 255, 255, 0.7)',
                    text: '#1a1a1a',
                    primary: '#3b82f6',
                    secondary: '#8b5cf6',
                },
                // Dark theme
                dark: {
                    bg: '#0f172a',
                    card: 'rgba(30, 41, 59, 0.7)',
                    text: '#f1f5f9',
                    primary: '#60a5fa',
                    secondary: '#a78bfa',
                },
                // Colorblind theme
                colorblind: {
                    bg: '#fef9f3',
                    card: 'rgba(255, 248, 240, 0.7)',
                    text: '#2c1810',
                    primary: '#0077bb',
                    secondary: '#ee7733',
                },
            },
        },
    },
    plugins: [],
}