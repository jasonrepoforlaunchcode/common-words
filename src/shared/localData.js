import {getRandomNum} from './utils.js';

export function setLocalData(data){
    localStorage.setItem("data", JSON.stringify(data));
}

export function getLocalData(){
    return JSON.parse(localStorage.getItem("data"));
}

export function updateLocalDeck(langName, deckName, newDeck){
    let data = JSON.parse(localStorage.getItem("data"));
    if (data){
        let updatedData = data.map((lang) => {
            return (lang.name !== langName ? lang : {...lang, decks: lang.decks.map((deck) => {
                return (deck.name !== deckName ? deck : {id: deck.id ,name: deck.name, list: newDeck})
            })})
        })
        localStorage.setItem("data", JSON.stringify(updatedData));
    }
}

export function addLanguage(langName){
    if (!langName){
        return;
    }
    let data = JSON.parse(localStorage.getItem("data"));
    if (data){
        let updatedData = [...data, { id: getRandomNum(2000, 9999).toString(), name: langName, decks: []}];
        localStorage.setItem("data", JSON.stringify(updatedData));
    } 
}

export function addDeck(langName, deckName){
    if (!deckName){
        return;
    }
    let data = JSON.parse(localStorage.getItem("data"));
    if (data){
        let updatedData = data.map((lang) => {
            return (lang.name !== langName ? lang : {...lang, decks: [...lang.decks, {id: getRandomNum(20000, 99999).toString() , name: deckName, list: []}]});
        })
        localStorage.setItem("data", JSON.stringify(updatedData));
    }
}

export function deleteLanguage(langId){
    if (!langId){
        return;
    } 
    let data = JSON.parse(localStorage.getItem("data"));
    if (data){
        let updatedData = data.map((lang) => {
            return (lang.id !== langId && lang);
        })
        localStorage.setItem("data", JSON.stringify(updatedData));
    }
}

export function deleteDeck(langId, deckId){
    if (!langId || !deckId){
        return;
    }
    let data = JSON.parse(localStorage.getItem("data"));
    if (data){
        let updatedData = data.map((lang) => {
            return (lang.id !== langId ? lang : {...lang, decks: lang.decks.map((deck) => {
                return (deck.id !== deckId && deck)
            })})
        })
        localStorage.setItem("data", JSON.stringify(updatedData));
    }
}
