import './index.scss';
import { sortItemsUp, sortItemsDown } from '../../store/boardList';
import { useDispatch } from 'react-redux';
import { ReactComponent as IconSort } from '../../img/icon-sort.svg';
import { ReactComponent as IconArrow } from '../../img/icon-arrow.svg';
import { Close } from '@mui/icons-material';

const Sorts = ({ setSmallBoardList, boardList }) => {
  const dispatch = useDispatch();

  return (
    <div className="sort">
      <div className="sort__wrapper-sorts">
        <button
          className="button sorts"
          onClick={() => {
            const wrapperButtonSorts = document.querySelector(
              '.sort__wrapper-sorts'
            );
            const wrapperButtonFilters = document.querySelector(
              '.filter__wrapper-filters'
            );
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
            onClick={(e) => {
              const wrapperButtonSorts = document.querySelector(
                '.sort__wrapper-sorts'
              );
              wrapperButtonSorts.classList.toggle('sort__wrapper-sorts--open');
            }}
          />
          <button
            className="button sort__by-up"
            value="up"
            onClick={(e) => {
              if (
                e.target
                  .closest('.button')
                  .classList.contains('sort__by-up--active')
              ) {
                setSmallBoardList(boardList);
              } else {
                dispatch(sortItemsUp());
                document
                  .querySelector('.sort__by-down')
                  .classList.remove('sort__by-down--active');
              }
              e.target
                .closest('.button')
                .classList.toggle('sort__by-up--active');
            }}
          >
            date <IconArrow className="sort__arrow-up" />
          </button>
          <button
            className="button sort__by-down"
            onClick={(e) => {
              if (
                e.target
                  .closest('.button')
                  .classList.contains('sort__by-down--active')
              ) {
                setSmallBoardList(boardList);
              } else {
                dispatch(sortItemsDown());
                document
                  .querySelector('.sort__by-up')
                  .classList.remove('sort__by-up--active');
              }
              e.target
                .closest('.button')
                .classList.toggle('sort__by-down--active');
            }}
          >
            Date <IconArrow className="sort__arrow-down" />
          </button>
          <button
            type="reset"
            className="button sort__reset"
            onClick={(e) => {
              document
                .querySelector('.sort__by-up')
                .classList.remove('sort__by-up--active');
              document
                .querySelector('.sort__by-down')
                .classList.remove('sort__by-down--active');
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
