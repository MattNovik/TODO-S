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
        <Search />
        <div className="head__filters-wrapper">
          <Filters
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            setSmallBoardList={setSmallBoardList}
            smallBoardList={smallBoardList}
            boardList={boardList}
            startDate={startDate}
            endDate={endDate}
          />
          <Sorts setSmallBoardList={setSmallBoardList} boardList={boardList} />
        </div>
      </div>
    </div>
  );
};

export default Head;
