const TraversalButton = ({classStyle, onClick, id, text, isEditing }) => {
    return (
        <button className={classStyle} onClick={onClick} id={id} disabled={isEditing}>{text}</button>
    );
}

export default TraversalButton;