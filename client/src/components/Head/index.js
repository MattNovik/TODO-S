import './index.scss';
import Search from '../Search';
import AuthNav from '../Auth/AuthNav';
import Filters from '../Filters';
import Sorts from '../Sorts';
import ThemeCheckbox from '../ThemeCheckbox';
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
  setTheme,
  theme,
  setSearchValue,
}) => {
  return (
    <div className="head">
      <div className="head__title-wrapper">
        <div className="head__title-wrapper-sec">
          <div className="head__title">
            <Logo />
          </div>
          <div className="head__theme-auth">
            <ThemeCheckbox theme={theme} setTheme={setTheme} />
            <AuthNav />
          </div>
        </div>
      </div>
      <div className="head__filters-search-wrapper">
        <Search
          smallBoardList={smallBoardList}
          setSmallBoardList={setSmallBoardList}
          boardList={boardList}
          setSearchValue={setSearchValue}
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
