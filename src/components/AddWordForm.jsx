import React, {useState} from 'react';

const AddWordForm = ({getWordData, id}) => {
    const [formData, setFormData] = useState({
        id: id,
        word: "",
        definition: "",
        image: "",
        soundfile: "",
        daysUntilNextReview: 0,
        dateOfLastReview: Date.now()
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    const sendData = () =>{
        getWordData(formData);
    }

    const discardEntry = () =>{
        getWordData("");
    }
    
    return (
        <form>
            <div className="form-group">
                <label for="word">Word:</label>
                <input type="text" name="word" id="word" value={formData.word} onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label for="definition">Definition:</label>
                <input type="text" name="definition" id="definition" value={formData.definition} onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label for="image">Image:</label>
                <input type="text" name="image" id="image" value={formData.image} onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label for="soundfile">Soundfile:</label>
                <input type="text" name="soundfile" id="soundfile" value={formData.soundfile} onChange={handleChange}/>
            </div>

            <button type="submit" onClick={sendData}>commit</button>
            <button onClick={discardEntry}>back</button>
        </form>
    );
}

export default AddWordForm;