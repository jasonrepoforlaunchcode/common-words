import '../Global.css'

const DeletePopUp = ({objectName, eventId, deletionRef, abortRef}) => {
    return (
        <div className="deletion-pop-up">
            <div>Delete {objectName.toString().split(" ")[0]}? (This is permanent!)</div>
            <div className="choice-container">
                <button className="final-delete-button" onClick={deletionRef} name={objectName} id={eventId}>Delete</button>
                <button onClick={abortRef} id={eventId}>Cancel</button>
            </div>
        </div>
    );
}

export default DeletePopUp;