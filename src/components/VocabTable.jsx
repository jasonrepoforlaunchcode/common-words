import {useState} from 'react';

const VocabTable = ({deck, returnNewData}) => {
    const [tableData, setTableData] = useState();

    const removeRow = (e) =>{
        const table = document.getElementById('vocabList');
        const rows = table.querySelectorAll('tr');
        for (let row of rows){
            if (e.target.id === row.id){
                table.deleteRow(Number(row.rowIndex));
            }
        }
    }

    const wordsJSX = deck.map((word, wordKey) => 
        {
            return <tr id={wordKey}>
                <td name="word"><div contenteditable="true" spellcheck="false">{word.word}</div></td>
                <td name="definition"><div contenteditable="true" spellcheck="false">{word.definition}</div></td>
                <td className="image-cell" name="image"><div contenteditable="true" spellcheck="false">{word.image}</div></td>
                <td className="soundfile-cell" name="soundfile"><div contenteditable="true" spellcheck="false">{word.soundfile}</div></td>
                <td><button onClick={removeRow} id={wordKey}>delete</button></td>
            </tr>
        }
    )

    const tableJSX = <table id="vocabList">
                        <thead>
                            <tr>
                                <th>Word</th>
                                <th>Definition</th>
                                <th>Image</th>  
                                <th>Soundfile</th>                         
                            </tr>
                        </thead>
                        <tbody>
                            {wordsJSX}
                        </tbody>
                    </table>

    const submitChanges = () =>{
        const table = document.getElementById('vocabList');
        if (!table) {
            return;
        }
        const rows = table.querySelectorAll('tr');
        const newDeck = [];
        for (let i = 1; i < rows.length; i++) {//looping through the table rows, minus the header
            const cells = rows[i].querySelectorAll('td');
            const newWord = {}
            for(let key of Object.keys(deck[i-1])){
                let isMatch = -1;
                for (let j = 0; j <cells.length; j++){//looping through the cells of the current row looking for a match
                    if ( key === cells[j].getAttribute("name")){
                        isMatch = j;
                    }
                }
                if (isMatch > -1){
                    newWord[key] = cells[isMatch].textContent;
                }
                else {
                    newWord[key] = deck[i-1][key];
                }
            }
            newDeck.push(newWord);
        }
        returnNewData(newDeck);
    }  

    const revertChanges = () =>{
        returnNewData(deck);
    }

    return (
        <>
            {tableJSX}
            <button onClick={submitChanges}>save</button>
            <button onClick={revertChanges}>back</button>
        </>
    );
}

export default VocabTable;