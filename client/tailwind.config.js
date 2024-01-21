/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'primary': '#6521a4',
                'light-primary': '#ffffff',
                'light-secondary': '#fefeff',
                'light-accent': '#f3f4f6',
                'light-text': '#18181b',
                'light-hover-primary': '#f3f4f6',
                'light-hover-secondary': '#f9fafb',
                'light-border': '#e5e7eb',
            },
        },
        fontFamily: {
            sans: ['Quicksand', 'sans-serif'],
        },
        screens: {
            'sm': '540px',
            'md': '720px',
            'lg': '960px',
            'xl': '1140px',
            '2xl': '1320px',
        },
        container: {
            center: true,
            padding: '1.5rem',
        },
    },
    plugins: [],
}

