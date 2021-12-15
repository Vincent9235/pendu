import react from 'react';
import './icon.css';

export default function ChangeIcon({ value }) {
    return <img src={`https://avatars.dicebear.com/api/micah/${value}.svg?r=50`} className="icon"></img>
}
