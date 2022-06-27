import { useState } from 'react';

function Form(children) {
    const [formValues, setformValues] = useState({
        txt: '',
        complete: false,
    });
    const handleInputChange = event => {
        setformValues({
            ...formValues,
            [event.target.name]: event.target.value,
        });
    };
    const handleSubmit = () => {
        if (formValues.txt === '') {
            window.alert('할 일을 등록해주세요!');
        } else {
            children.onAddList({
                id: Date.now(),
                ...formValues,
            });
        }
    };
    return (
        <div>
            <input
                type="text"
                name="txt"
                placeholder="할일을 적어주세요!"
                value={formValues.txt}
                onChange={handleInputChange}
                id="todoTxt"
            />
            <button type="button" onClick={handleSubmit}>
                등록
            </button>
        </div>
    );
}
export default Form;
