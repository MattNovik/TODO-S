import './index.scss';
import { sortItemsUp, sortItemsDown } from '../../store/boardList';
import { useDispatch } from 'react-redux';

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
          sort
        </button>
        <button
          className="buttonFS sort__button-by-up"
          onClick={() => {
            dispatch(sortItemsUp());
          }}
        >
          date Up
        </button>
        <button
          className="buttonFS sort__button-by-down"
          onClick={() => {
            dispatch(sortItemsDown());
          }}
        >
          Date Down
        </button>
        <button
          className="buttonFS sort__button-by-usual"
          onClick={() => {
            setSmallBoardList(boardList);
          }}
        >
          usual
        </button>
      </div>
      <div className="sort__wrapper-sorts"></div>
    </div>
  );
};

export default Sorts;
