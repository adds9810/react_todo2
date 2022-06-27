import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Form from './components/Form';
import Lists from './components/Lists';

function App() {
    const [lists, setLists] = useState(() => {
        return JSON.parse(window.localStorage.getItem('LISTS') || '[]');
    });
    const [checkAllVal, setCheckAll] = useState(false);
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
                    const temp = list;
                    temp.complete = value;
                    return temp;
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
            // for (const row in lists) {
            Object.key(lists).forEach(row => {
                if (lists[row].complete !== true) {
                    changeChkAll = false;
                } else {
                    changeChkAll = true;
                }
            });
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
    useEffect(() => {
        window.localStorage.setItem('LISTS', JSON.stringify(lists));
        chkAllAction();
    }, [lists]);
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
App.propsTypes = {
    children: PropTypes.node.isRequired,
};
export default App;
