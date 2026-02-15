import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || 'medium');

    useEffect(() => {
        localStorage.setItem('theme', theme);
        localStorage.setItem('fontSize', fontSize);
    }, [theme, fontSize]);

    const value = { theme, setTheme, fontSize, setFontSize };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used with ThemeProvider');
    }
    return context;
}