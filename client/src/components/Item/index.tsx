import * as React from 'react';
import { forwardRef, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import './index.scss';
import { removeItem, updateItem, changeTypeTask } from '../../store/boardList';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import { useDrag, useDrop } from 'react-dnd';
import { TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import DatePicker from 'react-datepicker';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconFlag from '-!svg-react-loader!../../img/icon-flag.svg';
import { DataProps, CustomInputProps } from '../../interfaces/interfaces';
import { month } from '../../constants/constants';

const CustomInput = forwardRef(
  (
    { value, onClick }: CustomInputProps,
    ref: React.LegacyRef<HTMLButtonElement> | undefined
  ) => (
    <button
      type="button"
      className="item__date-visual-button"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  )
);

const Item = ({
  as,
  index,
  baseId,
  idItem,
  nameItem,
  description,
  date,
  classChange,
  typeTask,
}) => {
  const dispatch = useDispatch();
  const dateObj = new Date(date);
  const coverDate =
    dateObj.getDate() +
    ' ' +
    month[dateObj.getMonth()] +
    ', ' +
    dateObj.getFullYear() +
    ' ' +
    dateObj.getHours() +
    ':' +
    (('' + dateObj.getMinutes()).length === 1
      ? '0' + dateObj.getMinutes()
      : dateObj.getMinutes());
  const [pickerDate, setPickerDate] = useState(new Date(date).getTime());
  const [classDate] = useState(new Date().getTime() > date ? true : false);

  const { user, isAuthenticated } = useAuth0();

  const [, drag /* , preview */] = useDrag({
    type: 'item',
    item: {
      index,
      baseId,
      idItem,
      nameItem,
      description,
      date,
      classChange,
      typeTask,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'item',
    hover: (item: any, monitor: any) => {
      let target = ref.current as HTMLElement | null;
      if (!target) {
        return;
      }
      if (target.dataset.typeTask !== item.typeTask) {
        //block swipe order. rework later
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = target?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;
      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;
      //moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const ref = useRef(null);
  const dragDrop = drag(drop(ref));

  window.onkeydown = (e: { keyCode: number; key: string }) => {
    const objData = document.querySelector(
      '.item--change > form'
    ) as HTMLFormElement;
    if ((e.keyCode === 13 || e.key === 'Enter') && objData) {
      let data = collectData(objData);
      updateItemForm(data);
      dispatch(updateItem(data));
      (objData.closest('li') as HTMLElement).classList.remove('item--change');
      (objData.closest('li') as HTMLElement).classList.remove('item-new');
    }
  };

  const collectData = (currentForm: HTMLFormElement) => {
    const data = new FormData(currentForm);
    let getData: DataProps = {
      index: 0,
      _id: data.get('idItem'),
      typeTask: data.get('typeTask'),
      idItem: data.get('idItem'),
      nameItem: data.get('nameItem'),
      description: data.get('description'),
      date: data.get('date'),
      classChange: '',
      userEmail: !isAuthenticated ? '' : user !== undefined ? user.email : '',
    };
    return getData;
  };

  const deleteItem = () => {
    fetch('/' + baseId, {
      method: 'DELETE',
    });
  };

  const updateItemForm = (data: DataProps) => {
    fetch('/' + baseId, {
      method: 'PATCH',
      body: JSON.stringify({ data }),
      headers: { 'Content-Type': 'application/json' },
    });
    return false;
  };

  const changeType = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let target = e.target as HTMLButtonElement;
    let dataForm: DataProps = collectData(
      target.closest('form') as HTMLFormElement
    );
    dataForm.index =
      (target.closest('li') as HTMLElement).getAttribute('index') !== null
        ? Number((target.closest('li') as HTMLElement).getAttribute('index'))
        : 0;
    let data = {
      idItem: (target.closest('li') as HTMLElement).id,
      typeTask: target.value,
    };
    dataForm.typeTask = target.value;
    dispatch(changeTypeTask(data));
    updateItemForm(dataForm);
  };

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={classChange ? 'item ' + classChange : 'item'}
      data-classdate={classDate}
      data-datetime={pickerDate}
      data-typetask={typeTask}
      id={idItem}
      ref={dragDrop}
      index={index}
      tabIndex={0}
      onKeyPress={(e) => {
        let target = e.target as HTMLElement;
        if (e.key === 'Enter' && target.tagName === 'LI') {
          let listItem = document.querySelectorAll('.item');
          Array.from(listItem).map((item) => {
            item.classList.remove('item--change');
            item.classList.remove('item--new');
            return false;
          });
          (target.closest('li') as HTMLElement).classList.add('item--change');
          (
            (target.closest('li') as HTMLElement).querySelector(
              'input[name=nameItem]'
            ) as HTMLInputElement
          ).value = nameItem;
          (
            (target.closest('li') as HTMLElement).querySelector(
              '.item__description-input'
            ) as HTMLInputElement
          ).value = description;
        }
      }}
      onClick={(e) => {
        let target = e.target as HTMLElement;
        if (
          target.tagName !== 'BUTTON' &&
          target.tagName !== 'svg' &&
          target.tagName !== 'path'
        ) {
          let listItem = document.querySelectorAll('.item');
          Array.from(listItem).map((item) => {
            item.classList.remove('item--change');
            item.classList.remove('item--new');
            return false;
          });
          (target.closest('li') as HTMLElement).classList.add('item--change');
          (
            (target.closest('li') as HTMLElement).querySelector(
              'input[name=nameItem]'
            ) as HTMLInputElement
          ).value = nameItem;
          (
            (target.closest('li') as HTMLElement).querySelector(
              '.item__description-input'
            ) as HTMLInputElement
          ).value = description;
        }
      }}
    >
      <form
        action="/"
        method="POST"
        className="item__form"
        onSubmit={(e) => {
          let target = e.target as HTMLFormElement;
          e.preventDefault();
          let dataInfo = collectData(target);
          updateItemForm(dataInfo);
          dispatch(updateItem(dataInfo));
        }}
      >
        <input type="hidden" name="idItem" value={idItem} />
        <Close
          tabIndex={0}
          className="item__close"
          onClick={(e) => {
            let target = e.target as HTMLElement;
            let data = {
              id: (target.closest('li') as HTMLElement).id,
              target: target.tagName,
            };
            deleteItem();
            dispatch(removeItem(data));
          }}
          onKeyPress={(e) => {
            let target = e.target as HTMLElement;
            if (e.key === 'Enter') {
              let data = {
                id: (target.closest('li') as HTMLElement).id,
                target: target.tagName,
              };
              deleteItem();
              dispatch(removeItem(data));
            }
          }}
        />
        <TextField
          placeholder={nameItem}
          name="nameItem"
          className="item__name-input"
          onChange={(e) => {
            nameItem = e.target.value;
          }}
          draggable
          onDragStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          sx={{
            '& .MuiInputBase-input': {
              padding: '8px',
            },
            '& .MuiOutlinedInput-root:hover fieldset': {
              borderColor: '#1976d2',
            },
            '& .MuiOutlinedInput-root fieldset': {
              borderWidth: '2px',
              transition: 'border-color .3s ease',
            },
            '& .MuiInputLabel-root': {
              transform: 'translate(14px, 8px) scale(1)',
            },
            '& label.Mui-focused': {
              display: 'none',
            },
            '& .Mui-focused legend': {
              display: 'none',
            },
            '& .Mui-focused fieldset': {
              top: '0',
            },
          }}
        />
        <h3 className="item__name">{nameItem}</h3>
        <TextField
          draggable
          onDragStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          name="description"
          multiline={true}
          maxRows={3}
          defaultValue="Todo's description"
          onInput={(e) => {
            description = (e.target as HTMLTextAreaElement).value;
          }}
          placeholder={description}
          className="item__description-input"
          sx={{
            '& .MuiInputBase-root': {
              padding: '0',
              border: 'none',
            },
            '& .MuiInputBase-root:hover fieldset': {
              borderColor: 'transparent',
            },
          }}
        />
        <p className="item__description">{description}</p>
        <input type="hidden" name="typeTask" value={typeTask} />
        {typeTask === 'todo' ? (
          <div className="item__type-buttons-list">
            <button
              className="item__type-button-progress"
              type="button"
              value="progress"
              onClick={(e) => changeType(e)}
            >
              In progress
            </button>
            <button
              type="button"
              className="item__type-button-done"
              value="done"
              onClick={(e) => changeType(e)}
            >
              Done
            </button>
          </div>
        ) : typeTask === 'progress' ? (
          <div className="item__type-buttons-list">
            <button
              className="item__type-button-todo"
              value="todo"
              type="button"
              onClick={(e) => changeType(e)}
            >
              To Do
            </button>
            <button
              className="item__type-button-done"
              value="done"
              type="button"
              onClick={(e) => changeType(e)}
            >
              Done
            </button>
          </div>
        ) : (
          <div className="item__type-buttons-list">
            <button
              className="item__type-button-todo"
              value="todo"
              type="button"
              onClick={(e) => changeType(e)}
            >
              To Do
            </button>
            <button
              className="item__type-button-progress"
              value="progress"
              type="button"
              onClick={(e) => changeType(e)}
            >
              In progress
            </button>
          </div>
        )}
        <div className="item__date-save">
          <span className="item__date-visual">{coverDate}</span>
          <DatePicker
            selected={new Date(pickerDate)}
            timeInputLabel="Time:"
            dateFormat="dd MMM, yyyy HH:mm"
            showTimeInput
            onChange={(date) => {
              if (date !== null) {
                setPickerDate(date.getTime());
              }
            }}
            className="item__date"
            customInput={
              <CustomInput
                value={''}
                onClick={function (
                  event: React.MouseEvent<HTMLElement, MouseEvent>
                ): void {
                  throw new Error('Function not implemented.');
                }}
              />
            }
          />
          <div
            className={
              pickerDate < Date.now()
                ? 'item__flag item__flag--expired'
                : 'item__flag'
            }
          >
            <IconFlag />
          </div>
          <input type="hidden" name="date" value={pickerDate ?? undefined} />
          <input
            type="hidden"
            name="classChange"
            value={classChange ? 'item ' + classChange : 'item'}
          />
          <button
            type="submit"
            className="item__save-button"
            onClick={(e) => {
              let target = e.target as HTMLElement;
              (target.closest('li') as HTMLElement).classList.remove(
                'item--change'
              );
              (target.closest('li') as HTMLElement).classList.remove(
                'item-new'
              );
            }}
          >
            Save
          </button>
        </div>
      </form>
    </motion.li>
  );
};

export default Item;
