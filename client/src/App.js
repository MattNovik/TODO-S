import './App.scss';
import { Board } from './components/Board';
import React from 'react';
import { saveItem } from './store/boardList';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  window.onkeydown = (e) => {
    const listItem = document.querySelectorAll('.item--change');
    if (
      e.keyCode === 13 &&
      /* !e.target.classList.contains('item__description-input') && */
      listItem.length > 0
    ) {
      const objData = document.querySelector('.item--change');
      let data = {
        id: objData.closest('li').id,
        name: objData.closest('li').querySelector('input').value,
        description: objData
          .closest('li')
          .querySelector('.item__description-input').value,
        date: +objData.dataset.datetime,
        classChange: '',
      };
      console.log(data.date);
      dispatch(saveItem(data));
      objData.closest('li').classList.remove('item--change');
      objData.closest('li').classList.remove('item-new');
    }
  };

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <Board />
      {/* <p>{!data ? 'Loading...' : data}</p> */}
    </div>
  );
};

export default App;
