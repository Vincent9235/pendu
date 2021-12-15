import React, { useContext } from 'react';
import './content.css';
import { ThemeContext } from '../../Context/themeContext';

export default function Content() {
  
    const { theme } = useContext(ThemeContext);

    return (
        <div className={theme ? 'content light' : 'content dark'}>
            <h1>Trouve l'animal</h1>
            <p>{theme}</p>
        </div>
    )
}