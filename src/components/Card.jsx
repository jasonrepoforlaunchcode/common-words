import  {React,useEffect, useState} from 'react';

const Card = ({currentWord, showAnswer}) => {
    return (
        <div className="card">
            {<span className="word">{currentWord.word}</span>}
			{showAnswer && (
                <div className="answer">
                    {currentWord.definition}
                    <img className="mnemonic-image" src={currentWord.image}/>
                    <audio autoPlay src={currentWord.soundfile}></audio>
                </div>
			)}
        </div>
    );
}

export default Card;