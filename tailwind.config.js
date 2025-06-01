/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                lato: ['Lato', 'sans-serif'],
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                light: {
                    "primary": "#4CAF50",
                    "primary-content": "#ffffff",
                    "secondary": "#8BC34A",
                    "secondary-content": "#ffffff",
                    "accent": "#FFB74D",
                    "accent-content": "#ffffff",
                    "neutral": "#4E342E",
                    "neutral-content": "#ffffff",
                    "base-100": "#F1F8E9",
                    "base-200": "#E6EE9C",
                    "base-300": "#DCEDC8",
                    "base-content": "#1B5E20",
                    "info": "#64B5F6",
                    "success": "#81C784",
                    "warning": "#FFD54F",
                    "error": "#E57373"
                },
                dark: {
                    "primary": "#81C784",
                    "primary-content": "#1B5E20",
                    "secondary": "#AED581",
                    "secondary-content": "#263238",
                    "accent": "#FFB74D",
                    "accent-content": "#263238",
                    "neutral": "#2E3A29",
                    "neutral-content": "#E8F5E9",
                    "base-100": "#1B2B2B",
                    "base-200": "#263238",
                    "base-300": "#37474F",
                    "base-content": "#E8F5E9",
                    "info": "#4FC3F7",
                    "success": "#A5D6A7",
                    "warning": "#FFEE58",
                    "error": "#EF9A9A"
                }
            }
        ]
    }
}
