import './index.scss';
import { sortItemsUp, sortItemsDown } from '../../store/boardList';
import { useDispatch } from 'react-redux';
import { ReactComponent as IconSort } from '../../img/icon-sort.svg';
import { ReactComponent as IconArrow } from '../../img/icon-arrow.svg';

const Sorts = ({ setSmallBoardList, boardList }) => {
  const dispatch = useDispatch();

  return (
    <div className="sort">
      <div className="sort__wrapper-buttons-sorts">
        <button
          className="button sorts"
          onClick={() => {
            const wrapperButtonSorts = document.querySelector(
              '.sort__wrapper-buttons-sorts'
            );
            const wrapperButtonFilters = document.querySelector(
              '.filter__wrapper-buttons-filters'
            );
            wrapperButtonSorts.classList.toggle(
              'sort__wrapper-buttons-sorts--open'
            );
            if (
              wrapperButtonFilters.classList.contains(
                'filter__wrapper-buttons-filters--open'
              )
            ) {
              wrapperButtonFilters.classList.remove(
                'filter__wrapper-buttons-filters--open'
              );
            }
          }}
        >
          <IconSort />
          sort
        </button>
        <button
          className="buttonFS sort__button-by-up"
          value="up"
          onClick={() => {
            dispatch(sortItemsUp());
          }}
        >
          date <IconArrow className="sort__arrow-up" />
        </button>
        <button
          className="buttonFS sort__button-by-down"
          onClick={() => {
            dispatch(sortItemsDown());
          }}
        >
          Date <IconArrow className="sort__arrow-down" />
        </button>
        <button
          className="buttonFS sort__button-by-usual"
          onClick={() => {
            setSmallBoardList(boardList);
          }}
        >
          reset
        </button>
      </div>
      <div className="sort__wrapper-sorts"></div>
    </div>
  );
};

export default Sorts;
