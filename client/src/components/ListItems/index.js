import './index.scss';
import { useEffect, useState } from 'react';
import ListItemsType from '../ListItemsType';
import { LayoutGroup } from 'framer-motion';

const ListItems = ({
  smallBoardList,
  filterTodoList,
  filterProgressList,
  filterDoneList,
}) => {
  const [todoList, setTodoList] = useState(
    smallBoardList
      .filter((item) => item.typeTask === 'todo')
      .sort((a, b) => a.index - b.index)
  );

  const [maxTodoList, setMaxTodoList] = useState(6);
  const [smallTodoList, setSmallTodoList] = useState(
    todoList !== null && filterTodoList ? todoList.slice(0, maxTodoList) : []
  );
  const [progressList, setProgressList] = useState(
    smallBoardList
      .filter((item) => item.typeTask === 'progress')
      .sort((a, b) => a.index - b.index)
  );
  const [maxProgressList, setMaxProgressList] = useState(6);
  const [smallProgressList, setSmallProgressList] = useState(
    progressList !== null && filterProgressList
      ? progressList.slice(0, maxProgressList)
      : []
  );
  const [doneList, setDoneList] = useState(
    smallBoardList
      .filter((item) => item.typeTask === 'done')
      .sort((a, b) => a.index - b.index)
  );
  const [maxDoneList, setMaxDoneList] = useState(6);
  const [smallDoneList, setSmallDoneList] = useState(
    doneList !== null && filterDoneList ? doneList.slice(0, maxDoneList) : []
  );

  useEffect(() => {
    setTodoList(
      smallBoardList
        .filter((item) => item.typeTask === 'todo')
        .sort((a, b) => a.index - b.index)
    );
    setProgressList(
      smallBoardList
        .filter((item) => item.typeTask === 'progress')
        .sort((a, b) => a.index - b.index)
    );
    setDoneList(
      smallBoardList
        .filter((item) => item.typeTask === 'done')
        .sort((a, b) => a.index - b.index)
    );
  }, [smallBoardList]);

  useEffect(() => {
    setSmallTodoList(filterTodoList ? todoList.slice(0, maxTodoList) : []);
  }, [todoList, maxTodoList, filterTodoList]);

  useEffect(() => {
    setSmallProgressList(
      filterProgressList ? progressList.slice(0, maxProgressList) : []
    );
  }, [progressList, maxProgressList, filterProgressList]);

  useEffect(() => {
    setSmallDoneList(filterDoneList ? doneList.slice(0, maxDoneList) : []);
  }, [doneList, maxDoneList, filterDoneList]);

  return smallBoardList && smallBoardList.length !== 0 ? (
    <div className="list-items">
      <ListItemsType
        key="1"
        value="todo"
        typeList={todoList}
        smallTypeList={smallTodoList}
        setMaxTypeList={setMaxTodoList}
        setSmallTypeList={setSmallTodoList}
        maxTypeList={maxTodoList}
      />
      <ListItemsType
        key="2"
        value="progress"
        typeList={progressList}
        smallTypeList={smallProgressList}
        setMaxTypeList={setMaxProgressList}
        setSmallTypeList={setSmallProgressList}
        maxTypeList={maxProgressList}
      />
      <ListItemsType
        key="3"
        value="done"
        typeList={doneList}
        smallTypeList={smallDoneList}
        setMaxTypeList={setMaxDoneList}
        setSmallTypeList={setSmallDoneList}
        maxTypeList={maxDoneList}
      />
    </div>
  ) : (
    <div className="list-items-empty">
      <p>Hi! You can add new task or goal at this page!</p>
    </div>
  );
};

export default ListItems;
