import React, { useContext } from 'react';
import './content.css';
import { ThemeContext } from '../../Context/themeContext';
import Button from '../button/button';

export default function Content() {

    const { theme } = useContext(ThemeContext);

    //Call API
    
    //Word
    const fetchWord = async () => {
        fetch('https://animalfinderapi.herokuapp.com/word')
            .then(Response => Response.json())
            .then(json => console.log(json.data.word));
    }

    return (
        <div className={theme ? 'content light' : 'content dark'}>
            <h1>Trouve l'animal</h1>
            <p>{theme}</p>
            <Button value={'Génerer un mot'} onClick={() => fetchWord()} />
        </div>
    )
}