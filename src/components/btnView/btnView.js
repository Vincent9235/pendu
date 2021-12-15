import React, { useContext } from 'react';
import './btnView.css';
import { ThemeContext } from '../../Context/themeContext';

export default function BtnView() {
    const { toggleTheme, theme } = useContext(ThemeContext);

    return (
        <div
            onClick={toggleTheme}
            className={theme ? 'btn-toggle light': 'btn-toggle dark'}
            >
                {theme ? "🌙" : "☀️"}
        </div>
    )
}