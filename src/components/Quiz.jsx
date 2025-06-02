import {getRandomNum} from '../shared/utils.js';
import {useState, useEffect}from 'react';
import Card from './Card';

const Quiz = ({wholeDeck, dueDeck, handleBackToMenu}) => {
    
    const [curWord, setCurrentWord] = useState();
    const [previousWordIndex, setPreviousWordIndex] = useState(-1);
    const [showAnswer, setShowAnswer] = useState(false);
	const [allWords, setAllWords] = useState(
		wholeDeck.map(obj => {
			return { ...obj};
		})
	);
    const [stillDue, setStillDue] = useState(
		dueDeck.map(obj => {
			return { ...obj};
		})
    );

    useEffect(() => {
        setCurrentWord(getRandomWord());
    }, []);

    useEffect(() => {
        setCurrentWord(getRandomWord());
    }, [stillDue]);
    
    useEffect(() => {
        setShowAnswer(false);
    }, [curWord])

    const getRandomWord = () =>{
        let num = 0;
        if (stillDue.length > 1){
            do{
                num = getRandomNum(0, stillDue.length - 1);
            }while(num === previousWordIndex);
        }
        else if ((stillDue.length > 0)){
            num = 0;
        }
        else {
            return ""
        }
        
        setPreviousWordIndex(num);
        return stillDue[num];
    }

    const handleAnswerCorrect = () => {
        let updatedWords = allWords.map(aWord => {
            return (
                aWord.id !== curWord.id 
                ? aWord
                : {
                    ...aWord,
                    dateOfLastReview: Date.now(), 
                    daysUntilNextReview: 2.0
                }
            );
        })
        let updatedStillDue = stillDue.map(aWord => {
            return (
                aWord.id !== curWord.id ? aWord : ""
            );
        })

        var filteredStillDue = updatedStillDue.filter(Boolean);
        setStillDue(filteredStillDue);
        setAllWords(updatedWords);
        
    }

    const handleShowClicked = () => {
        setShowAnswer(true);
    }

    const handleAnswerIncorrect = () => {
        let updatedWords = allWords.map(aWord => {
            return (
                aWord.id !== curWord.id 
                ? aWord
                : {
                    ...aWord,
                    dateOfLastReview: Date.now(), 
                    daysUntilNextReview: 0.0
                }
            );
        })
        setAllWords(updatedWords);
        setCurrentWord(getRandomWord());
    }

    const sendBackDeckInfo = () => {
        handleBackToMenu(allWords);
    }

    const quizControl = (
        <div className="quiz-control">
            {!showAnswer
                ? <div>{curWord && <button onClick={handleShowClicked}>Show</button>}</div>
                : <div className="grade-buttons">
                    <button onClick={handleAnswerCorrect}>Correct</button>
                    <button onClick={handleAnswerIncorrect}>Incorrect</button>
                </div>
            }
                <button onClick={sendBackDeckInfo}>Back</button>
        </div>
    )

    return (
        <div className="quiz">
            {curWord ? <Card currentWord={curWord} showAnswer={showAnswer}/> : "All Caught Up"}  
            {quizControl}
        </div>
    );
}

export default Quiz;