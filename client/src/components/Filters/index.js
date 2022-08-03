import './index.scss';
import { ReactComponent as IconFilter } from '../../img/icon-filter.svg';
import DatePicker from 'react-datepicker';

const Filters = ({
  setEndDate,
  setStartDate,
  setSmallBoardList,
  smallBoardList,
  boardList,
  startDate,
  endDate,
}) => {
  const filterByDate = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setSmallBoardList(boardList);
    if (start !== null && end !== null) {
      setSmallBoardList(
        smallBoardList.filter(
          (item) => item.date >= start.getTime() && item.date <= end.getTime()
        )
      );
    }
  };

  return (
    <div className="filter">
      <div className="filter__wrapper-buttons-filters">
        <button
          className="button filters"
          onClick={() => {
            const wrapperButtonFilters = document.querySelector(
              '.filter__wrapper-buttons-filters'
            );
            const wrapperButtonSorts = document.querySelector(
              '.sort__wrapper-buttons-sorts'
            );

            wrapperButtonFilters.classList.toggle(
              'filter__wrapper-buttons-filters--open'
            );
            console.log('open filters');
            if (
              wrapperButtonSorts.classList.contains(
                'sort__wrapper-buttons-sorts--open'
              )
            ) {
              wrapperButtonSorts.classList.remove(
                'sort__wrapper-buttons-sorts--open'
              );
            }
          }}
        >
          <IconFilter />
          filter
        </button>
        <button
          onClick={(e) => {
            const wrapperFilterDate =
              document.querySelector('.filter__by-date');
            wrapperFilterDate.classList.toggle('filter__by-date--open');
          }}
          className="filter__button-by-date buttonFS"
        >
          date
        </button>
        <button
          onClick={() => console.log('byreal')}
          className="filter__button-by-real buttonFS"
        >
          {' '}
          real
        </button>
        <button
          onClick={() => {
            setStartDate(null);
            setEndDate(null);
            setSmallBoardList(boardList);
          }}
          className="filter__button-by-usual buttonFS"
        >
          {' '}
          usual
        </button>
      </div>
      <div className="filter__by-date">
        <DatePicker
          selected={startDate}
          onChange={filterByDate}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
      </div>
    </div>
  );
};

export default Filters;
