import './index.scss';
import { TextareaAutosize, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { removeItem, updateItem, changeTypeTask } from '../../store/boardList';
import DatePicker from 'react-datepicker';
import { forwardRef, useState, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDrag, useDrop } from 'react-dnd';
import { ReactComponent as IconFlag } from '../../img/icon-flag.svg';
import { motion } from 'framer-motion';

const month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <button
    type="button"
    className="item__date-visual-button"
    onClick={onClick}
    ref={ref}
  >
    {value}
  </button>
));

const Item = ({
  key,
  index,
  baseId,
  idItem,
  nameItem,
  description,
  date,
  classChange,
  typeTask,
  moveListItem,
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

  const [{ isDragging }, drag, preview] = useDrag({
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
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      if (ref.current.dataset.typeTask !== item.typeTask) {
        //block swipe order. rework later
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
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

  window.onkeydown = (e) => {
    const objData = document.querySelector('.item--change > form');
    if ((e.keyCode === 13 || e.key === 'Enter') && objData) {
      let data = collectData(objData);
      updateItemForm(data);
      dispatch(updateItem(data));
      objData.closest('li').classList.remove('item--change');
      objData.closest('li').classList.remove('item-new');
    }
  };

  const collectData = (currentForm) => {
    const data = new FormData(currentForm);
    let getData = {};
    getData.idItem = data.get('idItem');
    getData.nameItem = data.get('nameItem');
    getData.description = data.get('description');
    getData.date = data.get('date');
    getData.classChange = '';
    getData.typeTask = data.get('typeTask');
    isAuthenticated
      ? (getData.userEmail = user.email)
      : (getData.userEmail = '');
    return getData;
  };

  const deleteItem = () => {
    fetch('/' + baseId, {
      method: 'DELETE',
    });
  };

  const updateItemForm = (data) => {
    fetch('/' + baseId, {
      method: 'PATCH',
      body: JSON.stringify({ data }),
      headers: { 'Content-Type': 'application/json' },
    });
    return false;
  };

  const changeType = (e) => {
    let dataForm = collectData(e.closest('form'));
    dataForm.index = +e.closest('li').getAttribute('index');
    let data = {
      idItem: e.closest('li').id,
      typeTask: e.value,
    };
    dataForm.typeTask = e.value;
    dispatch(changeTypeTask(data));
    updateItemForm(dataForm);
  };

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      /* exit={{ opacity: 0 }} */
      className={classChange ? 'item ' + classChange : 'item'}
      data-classdate={classDate}
      data-datetime={pickerDate}
      data-typetask={typeTask}
      id={idItem}
      ref={dragDrop}
      index={index}
      tabIndex="0"
      onKeyPress={(e) => {
        if (e.key === 'Enter' && e.target.tagName === 'LI') {
          let listItem = document.querySelectorAll('.item');
          Array.from(listItem).map((item) => {
            item.classList.remove('item--change');
            item.classList.remove('item--new');
            return false;
          });
          e.target.closest('li').classList.add('item--change');
          e.target.closest('li').querySelector('input[name=nameItem]').value =
            nameItem;
          e.target
            .closest('li')
            .querySelector('.item__description-input').value = description;
        }
      }}
      onClick={(e) => {
        if (
          e.target.tagName !== 'BUTTON' &&
          e.target.tagName !== 'svg' &&
          e.target.tagName !== 'path'
        ) {
          let listItem = document.querySelectorAll('.item');
          Array.from(listItem).map((item) => {
            item.classList.remove('item--change');
            item.classList.remove('item--new');
            return false;
          });
          e.target.closest('li').classList.add('item--change');
          e.target.closest('li').querySelector('input[name=nameItem]').value =
            nameItem;
          e.target
            .closest('li')
            .querySelector('.item__description-input').value = description;
        }
      }}
    >
      <form
        action="/"
        method="POST"
        className="item__form"
        onSubmit={(e) => {
          e.preventDefault();
          let dataInfo = collectData(e.target);
          updateItemForm(dataInfo);
          dispatch(updateItem(dataInfo));
        }}
      >
        <input type="hidden" name="idItem" value={idItem} />
        <Close
          tabIndex="0"
          className="item__close"
          onClick={(e) => {
            let data = {
              id: e.target.closest('li').id,
              target: e.target.tagName,
            };
            deleteItem();
            dispatch(removeItem(data));
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              let data = {
                id: e.target.closest('li').id,
                target: e.target.tagName,
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
        <TextareaAutosize
          draggable
          onDragStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          aria-label=""
          name="description"
          minRows={3}
          maxRows={10}
          onChange={(e) => {
            description = e.target.value;
          }}
          style={{ width: '100%', height: '45px' }}
          multiline="true"
          placeholder={description}
          className="item__description-input"
        />
        <p className="item__description">{description}</p>
        <input type="hidden" name="typeTask" value={typeTask} />
        {typeTask === 'todo' ? (
          <div className="item__type-buttons-list">
            <button
              className="item__type-button-progress"
              type="button"
              value="progress"
              onClick={(e) => changeType(e.target)}
            >
              In progress
            </button>
            <button
              type="button"
              className="item__type-button-done"
              value="done"
              onClick={(e) => changeType(e.target)}
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
              onClick={(e) => changeType(e.target)}
            >
              To Do
            </button>
            <button
              className="item__type-button-done"
              value="done"
              type="button"
              onClick={(e) => changeType(e.target)}
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
              onClick={(e) => changeType(e.target)}
            >
              To Do
            </button>
            <button
              className="item__type-button-progress"
              value="progress"
              type="button"
              onClick={(e) => changeType(e.target)}
            >
              In progress
            </button>
          </div>
        )}
        <div className="item__date-save">
          <span className="item__date-visual">{coverDate}</span>
          <DatePicker
            selected={pickerDate}
            timeInputLabel="Time:"
            dateFormat="dd MMM, yyyy HH:mm"
            showTimeInput
            onChange={(date) => {
              setPickerDate(date.getTime());
            }}
            className="item__date"
            customInput={<CustomInput />}
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
              e.target.closest('li').classList.remove('item--change');
              e.target.closest('li').classList.remove('item-new');
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
