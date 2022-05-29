import { useEffect, useState } from 'react';

import Form from './components/Form';
import Lists from './components/Lists';

function App() {
    const [lists, setLists] = useState(() => {
        return JSON.parse(window.localStorage.getItem('LISTS') || '[]');
    });
    const [checkAllVal, setCheckAll] = useState(false);
    useEffect(() => {
        window.localStorage.setItem('LISTS', JSON.stringify(lists));
        chkAllAction();
    }, [lists]);
    const handleAddList = list => {
        setLists([...lists, list]);
    };
    const handleChange = value => {
        setCheckAll(value);
    };
    const handleUpdate = (cate, rowIndex, value) => {
        if (cate === 'chk') {
            if (rowIndex === 'all') {
                lists.map(list => {
                    list.complete = value;
                });
            } else {
                const editRowData = {
                    id: lists[rowIndex].id,
                    txt: lists[rowIndex].txt,
                    complete: value,
                };
                if (lists[rowIndex].complete !== value) {
                    lists.splice(rowIndex, 1, editRowData);
                }
            }
            setLists([...lists]);
        } else {
            // editComplete = lists[id]['complete']
        }
    };
    const chkAllAction = () => {
        let changeChkAll = false;
        const listLength = lists.length || 0;
        if (listLength > 0) {
            for (let row = 0; row < listLength; row++) {
                if (lists[row].complete !== true) {
                    changeChkAll = false;
                    break;
                }
                changeChkAll = true;
            }
        }
        handleChange(changeChkAll);
    };
    const handleRemove = id => {
        let changeArr = [];
        if (id !== 'all') {
            changeArr = lists.filter(list => list.id !== id);
        }
        setLists(changeArr);
    };
    return (
        <div>
            <div className="container">
                <h1>todo list</h1>
                <Form onAddList={handleAddList} />
                <Lists
                    lists={lists}
                    checkAllVal={checkAllVal}
                    setLists={setLists}
                    onUpdate={handleUpdate}
                    onRemove={handleRemove}
                />
            </div>
        </div>
    );
}

export default App;
