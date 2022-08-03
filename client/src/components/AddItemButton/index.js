import './index.scss';
import { addNewItem } from '../../store/boardList';
import { useDispatch } from 'react-redux';
import { ReactComponent as IconPlus } from '../../img/icon-plus.svg';
import { nanoid } from '@reduxjs/toolkit';
import { useAuth0 } from '@auth0/auth0-react';

const AddItemButton = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();

  const fetchpostItem = (nanoid) => {
    let data = {
      _id: nanoid,
      idItem: nanoid,
      nameItem: "Todo's name",
      date: new Date().getTime(),
      description: "Todo's description",
      classChange: 'item--change item--new',
      typeTask: 'todo',
    };

    if (!isAuthenticated) {
      data.userEmail = '';
    } else {
      data.userEmail = user.email;
    }

    // (B) FETCH
    fetch('/', {
      method: 'post',
      body: JSON.stringify({ data }),
      headers: { 'Content-Type': 'application/json' },
    });

    return false;
  };

  return (
    <button
      className="add-item-button"
      onClick={() => {
        let nanoidCreat = nanoid();
        dispatch(addNewItem(nanoidCreat));
        fetchpostItem(nanoidCreat);
      }}
    >
      <IconPlus />
      {/*           <picture>
      <source type="image/webp" srcSet={iconAddWebp} />
      <img
        src={iconAddUs}
        srcSet={iconAdd2x}
        width="50"
        height="50"
        alt="icon-add"
      />
    </picture> */}
      <span>New Task</span>
    </button>
  );
};

export default AddItemButton;
