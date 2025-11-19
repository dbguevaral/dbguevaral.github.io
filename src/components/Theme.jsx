import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark' || saved === 'light') setTheme(saved);
        else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', theme); 
        localStorage.setItem('theme', theme); 
    }, [theme])

    const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error ('useTheme must be used within ThemeProvider'); 
    return context;
}