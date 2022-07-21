import './App.scss';
import { Board } from './components/Board';
import React from 'react';
import { saveItem } from './store/boardList';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

const App = () => {
  const dispatch = useDispatch();
  window.onkeydown = (e) => {
    const objData = document.querySelector('.item--change');
    if (
      e.keyCode === 13 &&
      /* !e.target.classList.contains('item__description-input') && */
      objData.length > 0
    ) {
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

  return (
    <div className="App">
      <Board />
    </div>
  );
};

export default App;
