import { useEffect, useState } from 'react';
import List from './List';

function Lists(children) {
    const { lists, checkAllVal, setLists, onUpdate, onRemove } = children;
    const [chkAllBox, setChkAllBox] = useState(checkAllVal);
    useEffect(() => {
        setChkAllBox(checkAllVal);
    }, [checkAllVal]);
    console.log(`전체선택 ${checkAllVal},${chkAllBox}`);

    const checkAll = e => {
        const updateVal = 'chk';
        const allNum = 'all';
        const chk = e.target.checked;
        setChkAllBox(checkAllVal);
        onUpdate(updateVal, allNum, chk);
    };
    const deleteChoiceTodo = () => {
        if (window.confirm('정말로 삭제 하시겠습니까?')) {
            if (chkAllBox === true) {
                onRemove('all');
            } else {
                setLists(lists.filter(list => list.complete !== true));
            }
        }
    };
    return (
        <div>
            <ul className="list">
                {lists.map((list, index) => {
                    return (
                        <List
                            key={list.id}
                            id={list.id}
                            rowIndex={index}
                            txt={list.txt}
                            complete={list.complete}
                            onUpdate={onUpdate}
                            onRemove={onRemove}
                        />
                    );
                })}
            </ul>
            <div className="list_option">
                <label htmlFor="chkAll">
                    <input
                        type="checkbox"
                        name="chkAll"
                        id="chkAll"
                        checked={checkAllVal}
                        onChange={e => checkAll(e)}
                    />
                    전체선택
                </label>
                <button
                    type="button"
                    variant="secondary"
                    onClick={deleteChoiceTodo}
                >
                    선택삭제
                </button>
            </div>
        </div>
    );
}
export default Lists;
