import * as React from 'react';
import './index.scss';
import Search from '../Search';
import AuthNav from '../Auth/AuthNav';
import Filters from '../Filters';
import Sorts from '../Sorts';
import ThemeCheckbox from '../ThemeCheckbox';
// eslint-disable-next-line import/no-webpack-loader-syntax
import Logo from '-!svg-react-loader!../../img/logo.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconGithub from '-!svg-react-loader!../../img/icon-github.svg';
import { HeadProps } from '../../interfaces/interfaces';

const Head: React.FC<HeadProps> = ({
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
        <Search setSearchValue={setSearchValue} />
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
