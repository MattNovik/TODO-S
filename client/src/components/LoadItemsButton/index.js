import './index.scss';
import React from 'react';

const LoadItemsButton = ({
  listItems,
  typeList,
  setMaxList,
  setTypeList,
  maxList,
}) => {
  return listItems !== null &&
    listItems.length > maxList &&
    listItems.length !== typeList.length ? (
    <button
      className="load-more-button"
      onClick={e => {
        const listTypeItems = e.target.closest('.list').querySelector('ul');
        Array.from(listTypeItems).map(item => {
          if (
            item.classList.contains('item--change') ||
            item.classList.contains('item--new')
          ) {
            item.classList.remove('item--change');
            item.classList.remove('item--new');
          }
          return false;
        });
        setMaxList(maxList + maxList);
        setTypeList(listItems.slice(0, maxList));
      }}
    >
      Show more
    </button>
  ) : (
    <></>
  );
};

export default LoadItemsButton;
