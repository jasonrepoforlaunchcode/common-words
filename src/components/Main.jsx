import {useState, useEffect }from 'react';
import Quiz from './Quiz';
import AddItemButton from './AddItemButton';
import {setLocalData, getLocalData, updateLocalDeck, addLanguage, addDeck, deleteLanguage, deleteDeck} from '../shared/localData.js'
import AddWordForm from './AddWordForm.jsx';
import VocabTable from './VocabTable.jsx';
import TraversalButton from './TraversalButton.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Main = ({languageData}) => {
    const oneDayMS = 86400000;
    const [data, setData] = useState([]);
    const [curLanguage, setCurLanguage] = useState({});
    const [curDeck, setCurDeck] = useState([]);
    const [showDeckOptions, setShowDeckOptions] = useState(false);
    const [curDue, setCurDue] = useState([]);
    const [curDeckLength, setCurDeckLength] = useState(0);
    const [quizStarted, setQuizStarted] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [showDeckTable, setShowDeckTable] = useState(false);
    const [buttonColor, setButtonColor] = useState("green-background")
    useEffect(()=>{
        setLocalData(languageData);
        setData(getLocalData());
    }, [])

    useEffect(() => {
        if (curLanguage.name){
            data.map((lang) => {
                if (curLanguage.id == lang.id){
                    setCurLanguage(lang);
                }
            })
        }
    }, [data])

    useEffect(() => {
        if (curLanguage.name && curDeck.name) {
            Object.keys(curLanguage).map((key) => {
                if (key === "decks") {
                    curLanguage[key].map((deck) => {
                        if (curDeck.id == deck.id){
                        setCurDeck(deck);
                        setCurDeckLength(deck.length);
                    }
                })}
            })  
        }
    }, [curLanguage])

    useEffect(() => {
        if (curLanguage.name && curDeck.name && curDue){
            let deckToStudy = curDeck.list.filter((word) => {
                return wordIsReadyForReview(word);
            })
            setCurDue(deckToStudy);
        }
    }, [curDeck])

    const handleLanguageClick = (event) => {
        data.map((lang) => {
            if (event.target.id == lang.id){
                setCurLanguage(lang);
            }
        })
    }

    const handleDeckClick = (event) => {
        curLanguage.decks.map((deck) => {
            if (event.target.id == deck.id){
                setShowDeckOptions(true);
                setCurDeck(deck);
                setCurDeckLength(deck.list.length);
            }
        })
    }

    const handleEditingClick = () => {
        setShowDeckTable(curDeck);
    }
    const wordIsReadyForReview = (word) => {
        let TodaysDate = Date.now();
        let timeElapsedMS = TodaysDate - word.dateOfLastReview;
        let timeUntilNextReviewMS = oneDayMS * word.daysUntilNextReview;
        return timeElapsedMS > timeUntilNextReviewMS
    };
    
    const removeLanguage = (event) => {
        data.map((lang) => {
            if (event.target.id == lang.id){
                deleteLanguage(lang.id);
                setData(getLocalData());
            }
        })
    }
    const languagesJSX = data.map(lang => {
        return (
            lang && <span><TraversalButton onClick={handleLanguageClick} id={lang.id.toString()} text={lang.name} isEditing={isEditing}/>
            <TraversalButton classStyle="delete-button" onClick={removeLanguage} id={lang.id.toString()} text="x" isEditing={isEditing}/>
            </span>
        )
    })

    const removeDeck = (event) =>{
        curLanguage.decks.map((deck) => {
            if (event.target.id == deck.id){
                deleteDeck(curLanguage.id, deck.id);
                setData(getLocalData());
            }
        })
    }

    const curDecksJSX = Object.keys(curLanguage).map((key) => {
        if (key === "decks"){
            return (curLanguage[key].map((deck) => {
                return (
                    deck && <div>
                        <TraversalButton onClick={handleDeckClick} id={deck.id.toString()} text={deck.name} isEditing={isEditing}/>
                        <span>Total: {deck.list.length}  Due: {deck.list.filter((word) => {
                            return wordIsReadyForReview(word);
                        }).length}  <TraversalButton onClick={removeDeck} id={deck.id.toString()} text="delete" isEditing={isEditing}/>
                        </span>
                    </div>
                )
            }))
        }}
    )

    const handleStartQuiz = () =>{
        setQuizStarted(true);
    }
    
    const setEditingTrue = () =>{
        setEditing(true);
    }
    const setEditingFalse = () =>{
        setEditing(false);
        
    }

    const returnWordData = (data) =>{
        setEditing(false);
        if (!data){
            return;
        }
        let newDeck = [];
        Object.keys(curDeck).map((key) => {
            if (key === "list"){
                newDeck = curDeck[key];
                newDeck.push(data);
            }}
        )
        updateLocalDeck(curLanguage.name, curDeck.name, newDeck)
        setData(getLocalData());
    }

    const addNewLanguage = (newLang) =>{
        if(newLang){
            setEditing(false);
            addLanguage(newLang);
            setData(getLocalData());
        }
    }


    const addNewDeck = (newDeckName) => {
        if(newDeckName){
            setEditing(false);
            addDeck(curLanguage.name, newDeckName);
            setData(getLocalData());
        }
    }

    const handleBackToLanguages = () => {
        setCurLanguage({})
    }
    const handleBackToDecks = () =>{
        setCurDue([]);
        setCurDeck({});
        setShowDeckTable(false);
        setShowDeckOptions(false);
    }

    const handleBackToMenu = (AllWords) => {
        updateLocalDeck(curLanguage.name, curDeck.name, AllWords)
        setData(getLocalData("data"));
        setCurDue([]);
        setCurDeck({});
        setCurDeckLength(0);
        setQuizStarted(false);
        setShowDeckOptions(false);
    }

    const getNewDeckData = (deck) =>{
        updateLocalDeck(curLanguage.name, curDeck.name, deck);
        setData(getLocalData("data"));
        setShowDeckTable(false);
    }

    const receiveEditingStatus = (status) =>{
        setEditing(status);
    }

    const chooseLanguageMenu = (
        <div className="menu">
            <div>Your Languages</div>
            <div className="button-container">
                {languagesJSX}
                <AddItemButton handleNewListItem={addNewLanguage} sendBackEditingStatus={receiveEditingStatus}/>
            </div>
        </div>
    )

    const chooseDeckMenu = (
        <div className="menu">
            <div className="menu-heading">{curLanguage.name} Decks</div>
            <div>
                {curDecksJSX}
                <AddItemButton handleNewListItem={addNewDeck} sendBackEditingStatus={receiveEditingStatus}/>
                <TraversalButton onClick={handleBackToLanguages} id="" text="back" isEditing={isEditing}/>
            </div>
        </div>
    )


    const deckOptionsMenu = (
        <div className="menu">
            <div className="menu-heading">{curLanguage.name}</div>
            <div>{curDeck.name}</div>

            {showDeckTable ? <div><VocabTable deck={curDeck.list} returnNewData={getNewDeckData} /></div>
            : isEditing
                ? <div>
                    <AddWordForm getWordData={returnWordData} id={curDeckLength}/>
                </div>
                : <div className="button-container">
                    <span>Total: {curDeckLength} Due: {curDue.length}</span>
                    <button onClick={setEditingTrue}>+</button> new word
                    <button onClick={handleEditingClick}>edit deck</button>
                    <TraversalButton onClick={handleStartQuiz} id="" text="start quiz" isEditing={isEditing}/>
                    <TraversalButton onClick={handleBackToDecks} id="" text="back" isEditing={isEditing}/>
                    
                </div>}

        </div>
    )

    const quizScreen = (
        <Quiz wholeDeck={{...curDeck}.list} dueDeck={curDue} handleBackToMenu={handleBackToMenu}/> 
    )

    return (
        <div className="main">
            {quizStarted 
                ? quizScreen
                : <div><span>{showDeckOptions 
                    ? deckOptionsMenu
                    : curLanguage.name 
                        ? chooseDeckMenu 
                        : chooseLanguageMenu}
                        </span>
                </div>
            }
        </div>
    );
}

export default Main;