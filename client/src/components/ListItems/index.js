import './index.scss';
import { nanoid } from '@reduxjs/toolkit';
import Item from '../Item';
import { useEffect, useState, useCallback } from 'react';
import LoadItemsButton from '../LoadItemsButton';
import { useDispatch } from 'react-redux';
import { changeTypeTask } from '../../store/boardList';

const ListItems = ({ smallBoardList }) => {
  const dispatch = useDispatch();

  const [todoList, setTodoList] = useState(
    smallBoardList.filter((item) => item.typeTask === 'todo')
  );
  const [maxTodoList, setMaxTodoList] = useState(6);
  const [smallTodoList, setSmallTodoList] = useState(
    todoList !== null ? todoList.slice(0, maxTodoList) : []
  );
  const [progressList, setProgressList] = useState(
    smallBoardList.filter((item) => item.typeTask === 'progress')
  );
  const [maxProgressList, setMaxProgressList] = useState(6);
  const [smallProgressList, setSmallProgressList] = useState(
    progressList !== null ? progressList.slice(0, maxProgressList) : []
  );
  const [doneList, setDoneList] = useState(
    smallBoardList.filter((item) => item.typeTask === 'done')
  );
  const [maxDoneList, setMaxDoneList] = useState(6);
  const [smallDoneList, setSmallDoneList] = useState(
    doneList !== null ? doneList.slice(0, maxDoneList) : []
  );

  useEffect(() => {
    setTodoList(smallBoardList.filter((item) => item.typeTask === 'todo'));
    setProgressList(
      smallBoardList.filter((item) => item.typeTask === 'progress')
    );
    setDoneList(smallBoardList.filter((item) => item.typeTask === 'done'));
  }, [smallBoardList]);

  useEffect(() => {
    setSmallTodoList(todoList.slice(0, maxTodoList));
  }, [todoList, maxTodoList]);

  useEffect(() => {
    setSmallProgressList(progressList.slice(0, maxProgressList));
  }, [progressList, maxProgressList]);

  useEffect(() => {
    setSmallDoneList(doneList.slice(0, maxDoneList));
  }, [doneList, maxDoneList]);

  const movePetListItem = useCallback(
    (idItem, typeTaskDrag, typeTaskHover) => {
      if (typeTaskHover !== typeTaskDrag) {
        let data = {
          idItem: idItem,
          typeTask: typeTaskHover,
        };
        console.log('change');
        dispatch(changeTypeTask(data));
      } else {
        console.log('not change');
        return;
      }
      //const dragItem = pets[dragIndex];
      /*       const typeTask = smallBoardList[typeTaskDrag];
      // Swap places of dragItem and hoverItem in the pets array
      setPets((pets) => {
        const updatedPets = [...pets];
        //updatedPets[dragIndex] = hoverItem;
        updatedPets[hoverIndex] = dragItem;
        return updatedPets;
      }); */
    },
    [smallBoardList]
  );

  return smallBoardList && smallBoardList.length !== 0 ? (
    <div className="list-items">
      <div className="todo list">
        <div className="list-items__name-wrapper">
          <h3 className="list-items__name">To Do</h3>
          <div className="list-items__count">
            <span>{todoList !== null ? todoList.length : '0'}</span>
          </div>
        </div>
        <ul className="todo-list">
          {smallTodoList !== null && smallTodoList.length ? (
            smallTodoList.map((item) => {
              return (
                <Item
                  key={nanoid()}
                  baseId={item._id}
                  idItem={item.idItem}
                  nameItem={item.nameItem}
                  description={item.description}
                  date={item.date}
                  classChange={item.classChange}
                  typeTask={item.typeTask}
                  moveListItem={movePetListItem}
                />
              );
            })
          ) : (
            <></>
          )}
        </ul>
        <LoadItemsButton
          listItems={todoList}
          typeList={smallTodoList}
          setMaxList={setMaxTodoList}
          setTypeList={setSmallTodoList}
          maxList={maxTodoList}
        />
      </div>
      <div className="progress list">
        <div className="list-items__name-wrapper">
          <h3 className="list-items__name">In progress</h3>
          <div className="list-items__count">
            <span>{progressList !== null ? progressList.length : '0'}</span>
          </div>
        </div>
        <ul className="progress-list">
          {smallProgressList !== null && smallProgressList.length ? (
            smallProgressList.map((item) => {
              return (
                <Item
                  key={nanoid()}
                  baseId={item._id}
                  idItem={item.idItem}
                  nameItem={item.nameItem}
                  description={item.description}
                  date={item.date}
                  classChange={item.classChange}
                  typeTask={item.typeTask}
                  moveListItem={movePetListItem}
                />
              );
            })
          ) : (
            <></>
          )}
        </ul>
        <LoadItemsButton
          listItems={progressList}
          typeList={smallProgressList}
          setMaxList={setMaxProgressList}
          setTypeList={setSmallProgressList}
          maxList={maxProgressList}
        />
      </div>
      <div className="done list">
        <div className="list-items__name-wrapper">
          <h3 className="list-items__name">Done</h3>
          <div className="list-items__count">
            <span>{doneList !== null ? doneList.length : '0'}</span>
          </div>
        </div>
        <ul className="done-list">
          {smallDoneList !== null && smallDoneList.length ? (
            smallDoneList.map((item) => {
              return (
                <Item
                  key={nanoid()}
                  baseId={item._id}
                  idItem={item.idItem}
                  nameItem={item.nameItem}
                  description={item.description}
                  date={item.date}
                  classChange={item.classChange}
                  typeTask={item.typeTask}
                  moveListItem={movePetListItem}
                />
              );
            })
          ) : (
            <></>
          )}
        </ul>
        <LoadItemsButton
          listItems={doneList}
          typeList={smallDoneList}
          setMaxList={setMaxDoneList}
          setTypeList={setSmallDoneList}
          maxList={maxDoneList}
        />
      </div>
    </div>
  ) : (
    <div className="list-items-empty">
      <p>Hi! You can add new task or goal at this page!</p>
    </div>
  );
};

export default ListItems;
