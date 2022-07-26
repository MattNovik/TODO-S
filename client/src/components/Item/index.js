import './index.scss';
import { TextareaAutosize, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { removeItem, updateItem, saveItem } from '../../store/boardList';
import DatePicker from 'react-datepicker';
import { forwardRef, useState } from 'react';

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
  <button className="custom-input" onClick={onClick} ref={ref}>
    {value}
  </button>
));

const collectData = (currentForm) => {
  const data = new FormData(currentForm);
  let getData = {};
  getData.idItem = data.get('idItem');
  getData.nameItem = data.get('nameItem');
  getData.description = data.get('description');
  getData.date = data.get('date');
  getData.classChange = data.get('classChange');
  return getData;
};

function fetchpost(currentForm) {
  let data = collectData(currentForm);

  // (B) FETCH
  fetch('/', {
    method: 'post',
    body: JSON.stringify({ data }),
    headers: { 'Content-Type': 'application/json' },
  });

  return false;
}

export const Item = ({
  baseId,
  idItem,
  nameItem,
  description,
  date,
  classChange,
}) => {
  const dispatch = useDispatch();
  const dateObj = new Date(date);
  const coverDate =
    dateObj.getDate() +
    ' ' +
    month[dateObj.getMonth()] +
    ', ' +
    dateObj.getFullYear();
  const [pickerDate, setPickerDate] = useState(new Date(date).getTime());
  const [classDate] = useState(new Date().getTime() > date ? true : false);

  const deleteItem = () => {
    fetch('/' + baseId, {
      method: 'DELETE',
    });
  };

  const updateItemForm = (currentForm) => {
    let data = collectData(currentForm);
    fetch('/' + baseId, {
      method: 'PATCH',
      body: JSON.stringify({ data }),
      headers: { 'Content-Type': 'application/json' },
    });

    return false;
  };

  return (
    <li
      className={classChange ? 'item ' + classChange : 'item'}
      data-classdate={classDate}
      data-datetime={pickerDate}
      id={idItem}
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
          });
          e.target.closest('li').classList.add('item--change');
          e.target.closest('li').querySelector('input[name=nameItem]').value =
            nameItem;
          e.target
            .closest('li')
            .querySelector('.item__description-input').value = description;
          //dispatch(updateItem());
        }
      }}
    >
      <form
        action="/"
        method="POST"
        className="item__form"
        onSubmit={(e) => {
          let dataInfo = collectData(e.target);
          e.preventDefault();
          updateItemForm(e.target);
          dispatch(updateItem(dataInfo));
        }}
      >
        <input type="hidden" name="idItem" value={idItem} />
        <Close
          className="item__close"
          onClick={(e) => {
            let data = {
              id: e.target.closest('li').id,
              target: e.target.tagName,
            };
            deleteItem();
            dispatch(removeItem(data));
          }}
        />
        {/* <button onClick={deleteItem}>Del</button> */}
        <TextField
          //label="Enter your goal"
          placeholder={nameItem}
          name="nameItem"
          className="item__name-input"
          onChange={(e) => {
            nameItem = e.target.value;
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
          aria-label=""
          name="description"
          minRows={3}
          onChange={(e) => {
            description = e.target.value;
          }}
          placeholder={description}
          className="item__description-input"
        />
        <p className="item__description">{description}</p>
        <div className="item__date-save">
          <span className="item__date-visual">{coverDate}</span>
          <DatePicker
            selected={pickerDate}
            //showTimeSelect
            onChange={(date) => {
              setPickerDate(date.getTime());
            }}
            className="item__date"
            customInput={<CustomInput />}
            dateFormat="d MMM, yyyy"
          />
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
              let data = {
                id: e.target.closest('li').id,
                name: e.target.closest('li').querySelector('input').value,
                description: e.target
                  .closest('li')
                  .querySelector('.item__description-input').value,
                date: pickerDate,
                classChange: '',
              };
              dispatch(saveItem(data));
              e.target.closest('li').classList.remove('item--change');
              e.target.closest('li').classList.remove('item-new');
            }}
          >
            ОК
          </button>
        </div>
      </form>
    </li>
  );
};
