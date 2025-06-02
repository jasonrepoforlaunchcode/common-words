import {useState, useEffect }from 'react';
import Quiz from './Quiz';
import AddItemButton from './AddItemButton';
import {setLocalData, getLocalData, updateLocalDeck, addLanguage, addDeck, deleteLanguage, deleteDeck} from '../shared/localData.js'
import AddWordForm from './AddWordForm.jsx';
import VocabTable from './VocabTable.jsx';
import TraversalButton from './TraversalButton.jsx';
import DeletePopUp from './DeletePopUp.jsx';

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
    const [showingPopUp, setShowingPopUp] = useState({showing: false, name: "", id: ""});
    
    useEffect(()=>{
        if (localStorage.getItem("data") === null){
            setLocalData(languageData);
            setData(getLocalData());
        }
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
    
    const showPopUpTrue = (e) =>{
        setShowingPopUp({showing: true, name: e.target.name, id: e.target.id});
        setEditing(true);
    }

    const showPopUpFalse = () => {
        setShowingPopUp({showing: false, name: "", id: ""});
        setEditing(false);
    }

    const deleteObj = (e) => {
        const nameAndCategory = e.target.name.split(" ");
        if (nameAndCategory.length > 1){
            if (nameAndCategory[1] === "Language"){
                removeLanguage(e);
            }
            else if(nameAndCategory[1] === "Deck"){
                removeDeck(e);
            }
        }
        showPopUpFalse();

    }

    const languagesJSX = data.map(lang => {
        return (
            lang && <span><TraversalButton onClick={handleLanguageClick} id={lang.id.toString()} text={lang.name} isEditing={isEditing}/>
            <button className='delete-button' onClick={showPopUpTrue} name={lang.name + " Language"} id={lang.id.toString()} disabled={isEditing}>x</button>
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
                        }).length} 
                        <button className='delete-button' onClick={showPopUpTrue} name={deck.name + " Deck"}  id={deck.id.toString()} disabled={isEditing}>x</button>
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
            <div className="menu-heading">Languages</div>
            <div className="button-container">
                {languagesJSX}
                <AddItemButton text="start new language" handleNewListItem={addNewLanguage} sendBackEditingStatus={receiveEditingStatus}/>
            </div>
        </div>
    )

    const chooseDeckMenu = (
        <div className="menu">
            <div className="menu-heading">{curLanguage.name} Decks</div>
            <div>
                {curDecksJSX}
                <AddItemButton text="start new deck" handleNewListItem={addNewDeck} sendBackEditingStatus={receiveEditingStatus}/>
                <TraversalButton onClick={handleBackToLanguages} id="" text="back" isEditing={isEditing}/>
            </div>
        </div>
    )


    const deckOptionsMenu = (
        <div className="menu">
            <div className="menu-heading">{curLanguage.name} {curDeck.name}</div>
            {showDeckTable ? <div><VocabTable deck={curDeck.list} returnNewData={getNewDeckData} /></div>
            : isEditing
                ? <div>
                    <AddWordForm getWordData={returnWordData} id={curDeckLength}/>
                </div>
                : <div className="menu">
                    <span>Total: {curDeckLength} Due: {curDue.length}</span>
                    <button className='start-quiz' onClick={handleStartQuiz} isEditing={isEditing}>start quiz </button>
                    <div><button className="add-button" onClick={setEditingTrue} disabled={isEditing}>+</button > new word</div>
                    <button onClick={handleEditingClick} disabled={isEditing}>edit deck</button>
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
            {showingPopUp.showing && <DeletePopUp objectName={showingPopUp.name} eventId={showingPopUp.id} deletionRef={deleteObj} abortRef={showPopUpFalse}/>}
        </div>
    );
}

export default Main;