import * as React from 'react';
import './index.scss';
import { sortItems } from '../../store/boardList';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconSort from '-!svg-react-loader!../../img/icon-sort.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconArrow from '-!svg-react-loader!../../img/icon-arrow.svg';
import { Close } from '@mui/icons-material';
import { SortsProps } from '../../interfaces/interfaces';

const Sorts = ({ setSmallBoardList, boardList }: SortsProps) => {
  const dispatch = useDispatch();
  return (
    <div className="sort">
      <div className="sort__wrapper-sorts">
        <button
          className="button sorts"
          onClick={() => {
            const wrapperButtonSorts = document.querySelector(
              '.sort__wrapper-sorts'
            ) as HTMLElement;
            const wrapperButtonFilters = document.querySelector(
              '.filter__wrapper-filters'
            ) as HTMLElement;
            wrapperButtonSorts.classList.toggle('sort__wrapper-sorts--open');
            if (
              wrapperButtonFilters.classList.contains(
                'filter__wrapper-filters--open'
              )
            ) {
              wrapperButtonFilters.classList.remove(
                'filter__wrapper-filters--open'
              );
            }
          }}
        >
          <IconSort />
          <span>sort</span>
        </button>
        <div className="sort__wrapper">
          <Close
            className="sort__close"
            onClick={() => {
              const wrapperButtonSorts = document.querySelector(
                '.sort__wrapper-sorts'
              ) as HTMLElement;
              wrapperButtonSorts.classList.toggle('sort__wrapper-sorts--open');
            }}
          />
          <button
            className="button sort__by-up"
            value="up"
            onClick={(e) => {
              let target = e.target as HTMLElement;
              if (
                (
                  target.closest('.button') as HTMLButtonElement
                ).classList.contains('sort__by-up--active')
              ) {
                setSmallBoardList(boardList);
              } else {
                dispatch(sortItems('up'));
                (
                  document.querySelector('.sort__by-down') as HTMLElement
                ).classList.remove('sort__by-down--active');
              }
              (target.closest('.button') as HTMLButtonElement).classList.toggle(
                'sort__by-up--active'
              );
            }}
          >
            date <IconArrow className="sort__arrow-up" />
          </button>
          <button
            className="button sort__by-down"
            onClick={(e) => {
              let target = e.target as HTMLElement;
              if (
                (
                  target.closest('.button') as HTMLButtonElement
                ).classList.contains('sort__by-down--active')
              ) {
                setSmallBoardList(boardList);
              } else {
                dispatch(sortItems('down'));
                (
                  document.querySelector('.sort__by-up') as HTMLElement
                ).classList.remove('sort__by-up--active');
              }
              (target.closest('.button') as HTMLButtonElement).classList.toggle(
                'sort__by-down--active'
              );
            }}
          >
            Date <IconArrow className="sort__arrow-down" />
          </button>
          <button
            type="reset"
            className="button sort__reset"
            onClick={(e) => {
              (
                document.querySelector('.sort__by-up') as HTMLElement
              ).classList.remove('sort__by-up--active');
              (
                document.querySelector('.sort__by-down') as HTMLElement
              ).classList.remove('sort__by-down--active');
              setSmallBoardList(boardList);
            }}
          >
            reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sorts;
