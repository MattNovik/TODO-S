import './index.scss';
import { useEffect, useState } from 'react';
import ListItemsType from '../ListItemsType';

const ListItems = ({ smallBoardList }) => {
  const [todoList, setTodoList] = useState(
    smallBoardList
      .filter((item) => item.typeTask === 'todo')
      .sort((a, b) => a.index - b.index)
  );

  const [maxTodoList, setMaxTodoList] = useState(6);
  const [smallTodoList, setSmallTodoList] = useState(
    todoList !== null ? todoList.slice(0, maxTodoList) : []
  );
  const [progressList, setProgressList] = useState(
    smallBoardList
      .filter((item) => item.typeTask === 'progress')
      .sort((a, b) => a.index - b.index)
  );
  const [maxProgressList, setMaxProgressList] = useState(6);
  const [smallProgressList, setSmallProgressList] = useState(
    progressList !== null ? progressList.slice(0, maxProgressList) : []
  );
  const [doneList, setDoneList] = useState(
    smallBoardList
      .filter((item) => item.typeTask === 'done')
      .sort((a, b) => a.index - b.index)
  );
  const [maxDoneList, setMaxDoneList] = useState(6);
  const [smallDoneList, setSmallDoneList] = useState(
    doneList !== null ? doneList.slice(0, maxDoneList) : []
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
    setSmallTodoList(todoList.slice(0, maxTodoList));
  }, [todoList, maxTodoList]);

  useEffect(() => {
    setSmallProgressList(progressList.slice(0, maxProgressList));
  }, [progressList, maxProgressList]);

  useEffect(() => {
    setSmallDoneList(doneList.slice(0, maxDoneList));
  }, [doneList, maxDoneList]);

  return smallBoardList && smallBoardList.length !== 0 ? (
    <div className="list-items">
      <ListItemsType
        value="todo"
        typeList={todoList}
        smallTypeList={smallTodoList}
        setMaxTypeList={setMaxTodoList}
        setSmallTypeList={setSmallTodoList}
        maxTypeList={maxTodoList}
      />
      <ListItemsType
        value="progress"
        typeList={progressList}
        smallTypeList={smallProgressList}
        setMaxTypeList={setMaxProgressList}
        setSmallTypeList={setSmallProgressList}
        maxTypeList={maxProgressList}
      />
      <ListItemsType
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
