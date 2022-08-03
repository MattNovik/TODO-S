import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { refreshData, refreshDataUserEmail } from '../../store/boardList';
import { useAuth0 } from '@auth0/auth0-react';
import { borderSpace } from '../../store/boardList';
import { useEffect, useState } from 'react';
import Head from '../Head';
import ListItems from '../ListItems';
import AddItemButton from '../AddItemButton';
import Time from '../Time';

const Board = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { user, isAuthenticated } = useAuth0();
  const boardList = useSelector(borderSpace);
  const [smallBoardList, setSmallBoardList] = useState(boardList);
  const [data] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      console.log(JSON.stringify(user, null, 2));
      const userData = user;
      // получение данных при условии авторизации
      fetch('/api')
        .then((res) => res.json())
        .then((data) => {
          data.userEmail = userData.email;
          dispatch(refreshDataUserEmail(data));
        });
    } else {
      // получение данных при отсутсвия авторизации
      fetch('/api')
        .then((res) => res.json())
        .then((data) => {
          dispatch(refreshData(data));
        });
    }
  }, []);

  useEffect(() => {
    if (data === null) {
      localStorage.setItem('boardList', JSON.stringify(boardList));
    }
    setSmallBoardList(boardList);
    if (startDate !== null && endDate !== null) {
      setSmallBoardList(
        boardList.filter(
          (item) =>
            item.date >= startDate.getTime() && item.date <= endDate.getTime()
        )
      );
    }
  }, [boardList]);

  return (
    <div
      className="board"
      onClick={(e) => {
        const listItem = document.querySelectorAll('.item');
        const wrapperButtonFilters = document.querySelector(
          '.filter__wrapper-buttons-filters'
        );
        const wrapperButtonSorts = document.querySelector(
          '.sort__wrapper-buttons-sorts'
        );
        const wrapperFilterDate = document.querySelector('.filter__by-date');
        if (
          !e.target.closest('.filter__by-date') &&
          wrapperFilterDate.classList.contains('filter__by-date--open') &&
          !e.target.classList.contains('filter__button-by-date')
        ) {
          wrapperFilterDate.classList.remove('filter__by-date--open');
        } // убираю окно фильтра даты при клике не на фильтр
        if (
          ((wrapperButtonSorts.classList.contains(
            'sort__wrapper-buttons-sorts--open'
          ) ||
            wrapperButtonFilters.classList.contains(
              'filter__wrapper-buttons-filters--open'
            )) &&
            !e.target.classList.contains('sorts') &&
            !e.target.classList.contains('filters')) ||
          (!e.target.closest('.sorts') && !e.target.closest('.filters'))
        ) {
          wrapperButtonSorts.classList.remove(
            'sort__wrapper-buttons-sorts--open'
          );
          wrapperButtonFilters.classList.remove(
            'filter__wrapper-buttons-filters--open'
          );
        } // убираю фокус с фильтра и сортировки

        const profileInfo = document.querySelector('.profile__info');
        if (
          profileInfo &&
          !profileInfo.classList.contains('profile__info--close') &&
          !e.target.classList.contains('profile__picture') &&
          !e.target.closest('.profile')
        ) {
          profileInfo.classList.add('profile__info--close');
        } // убираю окно профиля если открыто
        if (!e.target.closest('li')) {
          if (
            (wrapperButtonSorts.classList.contains(
              'sort__wrapper-buttons-sorts--open'
            ) ||
              wrapperButtonFilters.classList.contains(
                'filter__wrapper-buttons-filters--open'
              )) &&
            !e.target.classList.contains('sorts') &&
            !e.target.classList.contains('filters')
          ) {
            wrapperButtonSorts.classList.remove(
              'sort__wrapper-buttons-sorts--open'
            );
            wrapperButtonFilters.classList.remove(
              'filter__wrapper-buttons-filters--open'
            );
          }
          Array.from(listItem).map((item) => {
            if (
              item.classList.contains('item--change') ||
              item.classList.contains('item--new')
            ) {
              item.classList.remove('item--change');
              item.classList.remove('item--new');
            }
            return false;
          });
        } // убираю фокус с задачи
      }}
    >
      {/* <div className="overlay-wrapper" onClick={() => {}}></div> */}
      <Head
        setSmallBoardList={setSmallBoardList}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        startDate={startDate}
        endDate={endDate}
        boardList={boardList}
        smallBoardList={smallBoardList}
      />
      <div className="board__main">
        <div className="board__time-add-wrapper">
          <Time />
          <AddItemButton />
        </div>
        <ListItems smallBoardList={smallBoardList} />
      </div>
    </div>
  );
};

export default Board;
