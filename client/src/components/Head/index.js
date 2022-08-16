import './index.scss';
import Search from '../Search';
import AuthNav from '../Auth/AuthNav';
import Filters from '../Filters';
import Sorts from '../Sorts';
import { ReactComponent as Logo } from '../../img/logo.svg';

const Head = ({
  setSmallBoardList,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
  boardList,
  smallBoardList,
  filterTodoList,
  setFilterTodoList,
  filterProgressList,
  setFilterProgressList,
  filterDoneList,
  setFilterDoneList,
}) => {
  return (
    <div className="head">
      <div className="head__title-wrapper">
        <div className="head__title-wrapper-sec">
          <h1 className="head__title">
            <Logo />
          </h1>
          <AuthNav />
        </div>
      </div>
      <div className="head__filters-search-wrapper">
        <Search
          smallBoardList={smallBoardList}
          setSmallBoardList={setSmallBoardList}
          boardList={boardList}
        />
        <div className="head__filters-wrapper">
          <Filters
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            setSmallBoardList={setSmallBoardList}
            smallBoardList={smallBoardList}
            boardList={boardList}
            startDate={startDate}
            endDate={endDate}
            filterTodoList={filterTodoList}
            setFilterTodoList={setFilterTodoList}
            filterProgressList={filterProgressList}
            setFilterProgressList={setFilterProgressList}
            filterDoneList={filterDoneList}
            setFilterDoneList={setFilterDoneList}
          />
          <Sorts setSmallBoardList={setSmallBoardList} boardList={boardList} />
        </div>
      </div>
    </div>
  );
};

export default Head;
