import * as React from 'react';
import './index.scss';
import { useDrop } from 'react-dnd';
import { changeTypeTask, addNewItemType } from '../../store/boardList';
import { useDispatch } from 'react-redux';
import Item from '../Item';
import { nanoid } from '@reduxjs/toolkit';
import LoadItemsButton from '../LoadItemsButton';
import { useRef, useState } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconPlus from '-!svg-react-loader!../../img/icon-plus.svg';
import { useAuth0 } from '@auth0/auth0-react';
import { AnimatePresence, Reorder, motion } from 'framer-motion';
import { DataProps } from '../../interfaces/interfaces';

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

  const updateItemForm = (data: any, baseId: string) => {
    fetch('/' + baseId, {
      method: 'PATCH',
      body: JSON.stringify({ data }),
      headers: { 'Content-Type': 'application/json' },
    }).catch((error) => {
      console.error(error);
    });

    return false;
  };

  const collectDataTypeTaskChange = (
    item: { typeTask: any; idItem: any; baseId: string },
    value: any
  ) => {
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
    hover: (item: any, monitor) => {
      let target = ref.current as HTMLElement | null;
      if (!target) {
        return;
      }
      if (item.typeTask !== target.dataset.typetask && !listHovered) {
        setListHovered(true);
      } else if (item.typeTask === target.dataset.typetask && listHovered) {
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

  const { user, isAuthenticated } = useAuth0();

  const fetchpostItem = (dataInfo: { id: any; type: any }) => {
    let data: DataProps = {
      index: 0,
      _id: dataInfo.id,
      idItem: dataInfo.id,
      nameItem: "Todo's name",
      date: new Date().getTime(),
      description: "Todo's description",
      classChange: '',
      typeTask: dataInfo.type,
      userEmail: !isAuthenticated ? '' : user !== undefined ? user.email : '',
    };

    // (B) FETCH
    fetch('/', {
      method: 'post',
      body: JSON.stringify({ data }),
      headers: { 'Content-Type': 'application/json' },
    });

    return false;
  };
  /* 
  const movePetListItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = smallTypeList[dragIndex];
      const hoverItem = smallTypeList[hoverIndex];
      // Swap places of dragItem and hoverItem in the pets array
      setSmallTypeList((smallTypeList: any) => {
        const updatedPets = [...smallTypeList];
        updatedPets[dragIndex] = hoverItem;
        updatedPets[hoverIndex] = dragItem;
        return updatedPets;
      });
    },
    [smallTypeList]
  ); */

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
      <div className="type-list__head">
        <div className="type-list__name-wrapper">
          <h3 className="type-list__name">{listName}</h3>
          <div className="type-list__count">
            <span>{typeList !== null ? typeList.length : '0'}</span>
          </div>
        </div>
        <button
          type="button"
          aria-label="add new task"
          className="type-list__add-button"
          onClick={() => {
            let data = {
              id: nanoid(),
              type: value,
            };
            dispatch(addNewItemType(data));
            fetchpostItem(data);
          }}
        >
          <IconPlus tabIndex={0} />
        </button>
      </div>
      <motion.div layout className="type-list__animation-wrapper">
        <Reorder.Group
          //layout
          axis="y"
          values={smallTypeList}
          onReorder={setSmallTypeList}
          className="type-list"
        >
          <li
            className={
              isOver && listHovered
                ? 'type-list__hidden-item type-list__hidden-item--show'
                : 'type-list__hidden-item'
            }
          ></li>
          <AnimatePresence>
            {smallTypeList !== null && smallTypeList.length ? (
              smallTypeList.map(
                (
                  item: {
                    idItem: React.Key | null | undefined;
                    _id: any;
                    nameItem: any;
                    description: any;
                    date: any;
                    classChange: any;
                    typeTask: any;
                  },
                  index: any
                ) => {
                  return (
                    <Item
                      as={Reorder.Item}
                      index={index}
                      key={item.idItem}
                      baseId={item._id}
                      idItem={item.idItem}
                      nameItem={item.nameItem}
                      description={item.description}
                      date={item.date}
                      classChange={item.classChange}
                      typeTask={item.typeTask}
                      /* moveListItem={movePetListItem} */
                    />
                  );
                }
              )
            ) : (
              <></>
            )}
          </AnimatePresence>
        </Reorder.Group>
      </motion.div>
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
