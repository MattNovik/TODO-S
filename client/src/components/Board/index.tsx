import * as React from 'react';
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
import Notification from '../Notification';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconGithub from '-!svg-react-loader!../../img/icon-github.svg';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Board = ({ theme, setTheme }) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState<any | null>(null);
  const [endDate, setEndDate] = useState<any | null>(null);
  const { user, isAuthenticated } = useAuth0();
  const boardList = useSelector(borderSpace);
  const [smallBoardList, setSmallBoardList] = useState(boardList);

  const [filterTodoList, setFilterTodoList] = useState(true);
  const [filterProgressList, setFilterProgressList] = useState(true);
  const [filterDoneList, setFilterDoneList] = useState(true);
  const [searchValue, setSearchValue] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      console.log(JSON.stringify(user, null, 2));
      const userData = user;
      // получение данных при условии авторизации
      fetch('/api')
        .then((res) => res.json())
        .then((data) => {
          userData !== undefined
            ? (data.userEmail = userData.email)
            : (data.userEmail = '');
          dispatch(refreshDataUserEmail(data));
        });
    } else {
      dispatch(
        refreshData(
          JSON.parse(localStorage.getItem('boardList') || '') !== null
            ? JSON.parse(localStorage.getItem('boardList') || '')
            : []
        )
      );
      // получение данных из localstorage при отсутсвия авторизации
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('boardList', JSON.stringify(boardList));
    }
    setSmallBoardList(boardList);
    if (startDate !== null && endDate !== null) {
      setSmallBoardList(
        boardList.filter(
          (item: { date: number }) =>
            item.date >= startDate.getTime() && item.date <= endDate.getTime()
        )
      );
    }
    if (searchValue !== null) {
      setSmallBoardList(
        boardList.filter(
          (item: { nameItem: string; description: string }) =>
            item.nameItem.toLowerCase().includes(searchValue) ||
            item.description.toLowerCase().includes(searchValue)
        )
      );
    }
  }, [boardList, searchValue, isAuthenticated]);

  return (
    <div
      className="board"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        const listItem = document.querySelectorAll('.item');
        const wrapperButtonFilters = document.querySelector(
          '.filter__wrapper-filters'
        ) as HTMLElement;
        const wrapperButtonSorts = document.querySelector(
          '.sort__wrapper-sorts'
        ) as HTMLElement;
        if (
          (wrapperButtonSorts.classList.contains('sort__wrapper-sorts--open') ||
            wrapperButtonFilters.classList.contains(
              'filter__wrapper-filters--open'
            )) &&
          !target.closest('.sort') &&
          !target.closest('.filter')
        ) {
          wrapperButtonSorts.classList.remove('sort__wrapper-sorts--open');
          wrapperButtonFilters.classList.remove(
            'filter__wrapper-filters--open'
          );
        } // убираю фокус с фильтра и сортировки

        const profileInfo = document.querySelector('.profile__info');
        if (
          profileInfo &&
          !profileInfo.classList.contains('profile__info--close') &&
          !target.classList.contains('profile__picture') &&
          !target.closest('.profile')
        ) {
          profileInfo.classList.add('profile__info--close');
        } // убираю окно профиля если открыто
        if (!target.closest('li')) {
          if (
            (wrapperButtonSorts.classList.contains(
              'sort__wrapper-sorts--open'
            ) ||
              wrapperButtonFilters.classList.contains(
                'filter__wrapper-filters--open'
              )) &&
            !target.closest('.sort') &&
            !target.closest('.filter')
          ) {
            wrapperButtonSorts.classList.remove('sort__wrapper-sorts--open');
            wrapperButtonFilters.classList.remove(
              'filter__wrapper-filters--open'
            );
          }
          if (
            (document.activeElement as HTMLElement).tagName !== 'INPUT' &&
            (document.activeElement as HTMLElement).tagName !== 'TEXTAREA'
          ) {
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
          }
        } // убираю фокус с задачи
      }}
    >
      <Notification
        type="work"
        text="This project still in work, but you can use it right now!"
        button="ready"
        links={false}
      />
      <Notification
        type="notice"
        text={`This project is still creating by @lockdur. visit my`}
        button={false}
        links={
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/MattNovik"
          >
            {<IconGithub />}
          </a>
        }
      />
      <Head
        setSmallBoardList={setSmallBoardList}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        startDate={startDate}
        endDate={endDate}
        boardList={boardList}
        smallBoardList={smallBoardList}
        filterTodoList={filterTodoList}
        setFilterTodoList={setFilterTodoList}
        filterProgressList={filterProgressList}
        setFilterProgressList={setFilterProgressList}
        filterDoneList={filterDoneList}
        setFilterDoneList={setFilterDoneList}
        setTheme={setTheme}
        theme={theme}
        setSearchValue={setSearchValue}
      />
      <div className="board__main">
        <div className="board__time-add-wrapper">
          <Time />
          <AddItemButton />
        </div>
        <DndProvider backend={HTML5Backend}>
          <ListItems
            smallBoardList={smallBoardList}
            filterTodoList={filterTodoList}
            filterProgressList={filterProgressList}
            filterDoneList={filterDoneList}
          />
        </DndProvider>
      </div>
    </div>
  );
};

export default Board;
