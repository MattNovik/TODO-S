import * as React from 'react';
import './index.scss';
import { addNewItem } from '../../store/boardList';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconPlus from '-!svg-react-loader!../../img/icon-plus.svg';
import { nanoid } from '@reduxjs/toolkit';
import { useAuth0 } from '@auth0/auth0-react';
import { DataProps } from '../../interfaces/interfaces';

const AddItemButton = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();

  const fetchpostItem = (nanoid: string) => {
    let data: DataProps = {
      index: 0,
      _id: nanoid,
      idItem: nanoid,
      nameItem: "Todo's name",
      date: new Date().getTime(),
      description: "Todo's description",
      classChange: '',
      typeTask: 'todo',
      userEmail: '',
    };

    !isAuthenticated
      ? (data.userEmail = '')
      : user !== undefined
      ? (data.userEmail = user.email)
      : (data.userEmail = '');

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
      <span>New Task</span>
    </button>
  );
};

export default AddItemButton;
