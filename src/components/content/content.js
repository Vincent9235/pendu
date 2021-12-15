import React, { useContext, useState, useEffect } from 'react';
import './content.css';
import { ThemeContext } from '../../Context/themeContext';
import Button from '../button/button';

export default function Content() {

    const { theme } = useContext(ThemeContext);
    const GoodLetter = 'AZERTYUIOPQSDFGHJKLMWXCVBNazertyuiopqsdfghjklmwxcvbnéàâêè';

    /*******************Call API***************/
    /*  Manque de temps pour réaliser le compteur et améliorer (notamment dynamiser) la page principale 
        Il aurait fallu décrémenter un compteur dès que la lettre n'est pas dans le mot 
        Si l'utilisateur a trouvé toutes les lettres afficher une modal gagné sinon modal perdu
        Uitliser isWin (true ou false)
        Rajouter contrôle des lettres saisies (si key press > 1 alors message d'alerte)

        Idée de librairie à utiliser pour Datas:
        Rechart
        Récupération des données puis traitement de celle-ci (Ratio de victoire, mot préferée etc...)
        Fetch l'API avec All
    */

    const [completed, setcompleted] = useState(false);
    const [findWord, setfindWord] = useState("");
    const [found, setfound] = useState("");

    const fetchWord = async () => {
        setcompleted(false);
        fetch(`https://animalfinderapi.herokuapp.com/word`)
            .then(response => response.json())
            .then(json => handleData(json.data.word));
    }

    //On detecte la lettre saisie
    const handleKeyDown = (event) => {
        if (GoodLetter.includes(event.key)) {
            console.log("A key was pressed", event.key);
        }
    };
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown, false);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    function coverWord(str) {
        let hidden = '';
        for (let i = 0; i < str.length; i++) {
            hidden += '_';
        }
        return hidden;
    }

    function foundWord() {
        let end = '';
        for (let i = 0; i < found.length; i++) {
            end += ` ${found[i]} `;
        }
        return end;
    }

    function setCharAt(str, index, chr) {
        if (index > str.length - 1) return str;
        return str.substring(0, index), chr, str.substring(index + 1);
    }

    function handleData(word) {
        setfindWord(word);
        setfound(coverWord(word));
        console.log(word);
    }

    function equalWord(matchCharacter) {
        let temp = found;
        for (let i = 0; i < findWord.length; i++) {
            if (findWord[i] === matchCharacter) {
                temp = setCharAt(temp, i, matchCharacter);
            }
        }
        if (temp === findWord) {
            setcompleted(true);
        }
        setfound(temp);
    }

    /********Score & Leaderboard ******/
    const [score, setscore] = useState(undefined)
    useEffect(() => {
        (async () => {
            const newScore = await getScore()
            setscore(newScore)
        })()
        return () => { }
    }, [])
    const getScore = async () => {
        const scoreJson = await fetch('https://animalfinderapi.herokuapp.com/score')
        return await scoreJson.json()
    }
    if (!score) {
        return <p>Waiting</p>
    }

    /********Display Content **********/
    return (
        <div className={theme ? 'content light' : 'content dark'}>
            <h1>Trouve l'animal</h1>
            <p>{theme}</p>
            <div className='center'>
                <Button value={'Génerer un nouveau mot'} onClick={() => fetchWord()} />
                <br></br>
                <input id="keydown" type="text" placeholder='Tapez une lettre' maxLength="1" onChange={(event) => equalWord(event.target.value)}></input>
                <p>{foundWord(found)}</p>
            </div>

            <h1>Classement</h1>
            <table className='table'>
                <tbody>
                    {score.data.map(result => <tr key={result.username}><td>{result.username}</td><td><img src={result.avatar} /></td><td>Score: {result.score}</td></tr>)}
                </tbody>
            </table>
        </div>
    )
}