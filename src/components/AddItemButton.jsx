import {useEffect, useState} from 'react';
const AddItemButton = ({text, handleNewListItem, sendBackEditingStatus}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [itemName, setItemName] = useState("");

    useEffect(() => {
        sendBackEditingStatus(false);
    }, [])
    useEffect(() => {
        sendBackEditingStatus(isEditing)
    }, [isEditing])

    const setEditingTrue = () => {
        setIsEditing(true);
    }
    const setEditingFalse = () => {
        setIsEditing(false);
        handleNewListItem(itemName);
        setItemName("");
    }
    const handleChange = (e) => {
        setItemName(e.target.value)
    }

    return (
        <span >
            {isEditing 
                ? <span><button className="add-button" onClick={setEditingFalse}>save</button> <input type="text" onChange={handleChange}></input></span>
                : <span><button className="add-button" onClick={setEditingTrue}>+</button> {text}</span>}
                 
        </span>
    );
}

export default AddItemButton;