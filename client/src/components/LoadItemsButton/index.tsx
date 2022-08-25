import './index.scss';
import * as React from 'react';
import { LoadItemsButtonProps } from '../../interfaces/interfaces';

const LoadItemsButton = ({
  listItems,
  typeList,
  setMaxList,
  setTypeList,
  maxList,
}: LoadItemsButtonProps) => {
  return listItems !== null &&
    listItems.length > maxList &&
    listItems.length !== typeList.length ? (
    <button
      className="load-more-button"
      onClick={(e) => {
        const listTypeItems = (
          (e.target as HTMLElement).closest('.list') as HTMLElement
        ).querySelector('ul') as unknown as ArrayLike<any>;
        Array.from(listTypeItems).map((item: any) => {
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
