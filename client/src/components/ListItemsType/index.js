import './index.scss';
import { useDrop } from 'react-dnd';
import { changeTypeTask } from '../../store/boardList';
import { useDispatch } from 'react-redux';
import Item from '../Item';
import { nanoid } from '@reduxjs/toolkit';
import LoadItemsButton from '../LoadItemsButton';
import { useRef, useState, useCallback, useEffect } from 'react';

const ListItemsType = ({
  value,
  typeList,
  smallTypeList,
  setMaxTypeList,
  setSmallTypeList,
  maxTypeList,
}) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [listHovered, setListHovered] = useState(false);

  const updateItemForm = (data, baseId) => {
    fetch('/' + baseId, {
      method: 'PATCH',
      body: JSON.stringify({ data }),
      headers: { 'Content-Type': 'application/json' },
    });

    return false;
  };

  const collectDataTypeTaskChange = (item, value) => {
    if (item.typeTask !== value) {
      let data = {
        idItem: item.idItem,
        typeTask: value,
      };
      dispatch(changeTypeTask(data));
      item.typeTask = value;
      updateItemForm(item, item.baseId);
    }
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'item',
    hover: (item, monitor) => {
      if (item.typeTask !== ref.current.dataset.typetask && !listHovered) {
        setListHovered(true);
      } else if (
        item.typeTask === ref.current.dataset.typetask &&
        listHovered
      ) {
        setListHovered(false);
      }
    },
    drop: (item, monitor) => {
      collectDataTypeTaskChange(item, value);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  drop(ref);

  const movePetListItem = useCallback(
    (dragIndex, hoverIndex) => {
      // Swap places of dragItem and hoverItem in the pets array
      setSmallTypeList((smallTypeList) => {
        const updatedPets = [...smallTypeList];
        updatedPets.find((item) => item.index === dragIndex).index = hoverIndex;
        updatedPets.find((item) => item.index === hoverIndex).index = dragIndex;
        return updatedPets;
      });
      console.log(dragIndex + ' ' + hoverIndex);
    },
    [smallTypeList]
  );

  const listName =
    value === 'todo' ? 'To do' : value === 'done' ? 'Done' : 'In progress';
  const listClasName =
    value === 'todo'
      ? 'todo list'
      : value === 'done'
      ? 'done list'
      : 'progress list';

  return (
    <div className={listClasName} ref={ref} data-typetask={value}>
      <div className="list-items__name-wrapper">
        <h3 className="list-items__name">{listName}</h3>
        <div className="list-items__count">
          <span>{typeList !== null ? typeList.length : '0'}</span>
        </div>
      </div>
      <ul className="type-list">
        <li
          className={
            isOver && listHovered
              ? 'type-list__hidden-item type-list__hidden-item--show'
              : 'type-list__hidden-item'
          }
        ></li>
        {smallTypeList !== null && smallTypeList.length ? (
          smallTypeList.map((item) => {
            return (
              <Item
                index={item.index}
                key={nanoid()}
                baseId={item._id}
                idItem={item.idItem}
                nameItem={item.nameItem}
                description={item.description}
                date={item.date}
                classChange={item.classChange}
                typeTask={item.typeTask}
                moveListItem={movePetListItem}
              />
            );
          })
        ) : (
          <></>
        )}
      </ul>
      <LoadItemsButton
        listItems={typeList}
        typeList={smallTypeList}
        setMaxList={setMaxTypeList}
        setTypeList={setSmallTypeList}
        maxList={maxTypeList}
      />
    </div>
  );
};

export default ListItemsType;
