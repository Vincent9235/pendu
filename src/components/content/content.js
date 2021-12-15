import React, { useContext, useState, useEffect } from 'react';
import './content.css';
import { ThemeContext } from '../../Context/themeContext';
import Button from '../button/button';

export default function Content() {

    const { theme } = useContext(ThemeContext);
    const GoodLetter = 'AZERTYUIOPQSDFGHJKLMWXCVBNéàèêô';

    /*******************Call API***************/
    //Word
    const fetchWord = async () => {
        fetch('https://animalfinderapi.herokuapp.com/word')
            .then(Response => Response.json())
            .then(json => console.log(json.data.word));
    }

    const [score, setscore] = useState(undefined)
    useEffect(() => {
        (async () => {
            const newScore = await getScore()
            setscore(newScore)
        })()
        return () => { }
    }, [])

    //Score
    const getScore = async () => {
        const scoreJson = await fetch('https://animalfinderapi.herokuapp.com/score')
        return await scoreJson.json()
    }

    if (!score) {
        return <p>Waiting</p>
    }

    //Display content
    return (
        <div className={theme ? 'content light' : 'content dark'}>
            <h1>Trouve l'animal</h1>
            <p>{theme}</p>
            <Button value={'Génerer un mot'} onClick={() => fetchWord()} />
            <h1>Classement</h1>
            <table className='table'>
                <tbody>
                    {score.data.map(result => <tr key={result.username}><td>{result.username}</td><td><img src={result.avatar} /></td><td>Score: {result.score}</td></tr>)}
                </tbody>
            </table>
        </div>
    )
}