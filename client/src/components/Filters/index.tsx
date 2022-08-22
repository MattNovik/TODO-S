import * as React from 'react';
import './index.scss';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconFilter from '-!svg-react-loader!../../img/icon-filter.svg';
import DatePicker from 'react-datepicker';
import { Close } from '@mui/icons-material';
import { FilterProps } from '../../interfaces/interfaces';

const Filters: React.FC<FilterProps> = ({
  setEndDate,
  setStartDate,
  setSmallBoardList,
  smallBoardList,
  boardList,
  startDate,
  endDate,
  filterTodoList,
  setFilterTodoList,
  filterProgressList,
  setFilterProgressList,
  filterDoneList,
  setFilterDoneList,
}) => {
  const filterByDate = (dates: [any, any]): void => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setSmallBoardList(boardList);
    if (start !== null && end !== null) {
      setSmallBoardList(
        smallBoardList.filter(
          (item: { date: number }) =>
            item.date >= start.getTime() &&
            item.date <= end.getTime() + 86399999
        )
      );
    }
  };

  return (
    <div className="filter">
      <div className="filter__wrapper-filters">
        <button
          className="button filters"
          onClick={() => {
            const wrapperButtonFilters = document.querySelector(
              '.filter__wrapper-filters'
            ) as HTMLElement;
            const wrapperButtonSorts = document.querySelector(
              '.sort__wrapper-sorts'
            ) as HTMLElement;

            wrapperButtonFilters.classList.toggle(
              'filter__wrapper-filters--open'
            );

            if (
              wrapperButtonSorts.classList.contains('sort__wrapper-sorts--open')
            ) {
              wrapperButtonSorts.classList.remove('sort__wrapper-sorts--open');
            }
          }}
        >
          <IconFilter />
          <span>filter</span>
        </button>
        <div className="filter__wrapper">
          <Close
            className="filter__close"
            onClick={(e) => {
              const wrapperButtonFilters = document.querySelector(
                '.filter__wrapper-filters'
              ) as HTMLElement;
              wrapperButtonFilters.classList.toggle(
                'filter__wrapper-filters--open'
              );
            }}
          />
          <p className="filter__type-name">Date:</p>
          <DatePicker
            className="filter__by-date"
            selected={startDate}
            onChange={filterByDate}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
          <p className="filter__type-name">Type tasks:</p>
          <div className="filter__type-buttons-list">
            <button
              className="filter__type-button-todo"
              value="todo"
              onClick={(e) => {
                const target = e.target as HTMLButtonElement;
                target.classList.toggle('filter__type-button-todo--active');
                setFilterTodoList(!filterTodoList);
              }}
            >
              To do
            </button>
            <button
              className="filter__type-button-progress"
              value="progress"
              onClick={(e) => {
                const target = e.target as HTMLButtonElement;
                target.classList.toggle('filter__type-button-progress--active');
                setFilterProgressList(!filterProgressList);
              }}
            >
              In progress
            </button>
            <button
              className="filter__type-button-done"
              value="done"
              onClick={(e) => {
                const target = e.target as HTMLButtonElement;
                target.classList.toggle('filter__type-button-done--active');
                setFilterDoneList(!filterDoneList);
              }}
            >
              Done
            </button>
          </div>
          <button
            type="reset"
            className="button filter__reset"
            onClick={() => {
              setStartDate(null);
              setEndDate(null);
              setSmallBoardList(boardList);
              setFilterTodoList(true);
              setFilterProgressList(true);
              setFilterDoneList(true);
              (
                document.querySelector(
                  '.filter__type-button-todo'
                ) as HTMLButtonElement
              ).classList.remove('filter__type-button-todo--active');
              (
                document.querySelector(
                  '.filter__type-button-progress'
                ) as HTMLButtonElement
              ).classList.remove('filter__type-button-progress--active');
              (
                document.querySelector(
                  '.filter__type-button-done'
                ) as HTMLButtonElement
              ).classList.remove('filter__type-button-done--active');
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
