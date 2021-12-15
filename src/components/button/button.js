import react from 'react';
import './button.css';

function Button({ onClick: handleClick, value = "" }) {
    return (
        <button className="button" onClick={handleClick}>
            {value}
        </button>
    );
}

export default Button;