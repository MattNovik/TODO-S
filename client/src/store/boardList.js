import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('boardList')
  ? JSON.parse(localStorage.getItem('boardList'))
  : [];

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addNewItem: (state, action) => {
      let date = new Date().getTime();
      state.map((item, i) => {
        item.classChange = '';
        return false;
      });
      state.unshift({
        _id: action.payload,
        idItem: action.payload,
        index: 0,
        nameItem: "Todo's name",
        date: date,
        description: "Todo's description",
        classChange: 'item--change item--new',
        userEmail: undefined,
        typeTask: 'todo',
      });
    },
    addNewItemType: (state, action) => {
      let date = new Date().getTime();
      state.map((item, i) => {
        item.classChange = '';
        return false;
      });
      state.unshift({
        _id: action.payload.id,
        idItem: action.payload.id,
        index: 0,
        nameItem: "Todo's name",
        date: date,
        description: "Todo's description",
        classChange: 'item--change item--new',
        userEmail: undefined,
        typeTask: action.payload.type,
      });
    },
    removeItem: (state, action) => {
      let newId = action.payload.id;
      state.map((item, i) => {
        item.classChange = '';
        return false;
      });
      if (action.payload.target === 'svg' || action.payload.target === 'path') {
        state.map((item, i) => {
          if (item.idItem === newId) {
            state.splice(i, 1);
          }
          return false;
        });
      }
    },
    sortItemsUp: (state, action) => {
      state
        .sort((a, b) => a.date - b.date)
        .map((item, i) => {
          item.index = i;
        });
    },
    sortItemsDown: (state, action) => {
      state
        .sort((a, b) => b.date - a.date)
        .map((item, i) => {
          item.index = i;
        });
    },
    updateItem: (state, action) => {
      let index = action.payload.index;
      let id = action.payload.idItem;
      let name = action.payload.nameItem;
      let description = action.payload.description;
      let date = action.payload.date;
      let classChange = action.payload.classChange;
      let userEmail = action.payload.userEmail;
      let typeTask = action.payload.typeTask;
      state.map((item, i) => {
        item.classChange = '';
        if (item.idItem === id) {
          if (name) {
            item.nameItem = name;
          }
          if (description) {
            item.description = description;
          }
          item.index = index;
          item.date = +date;
          item.classChange = classChange;
          item.userEmail = userEmail;
          item.typeTask = typeTask;
        }
        return false;
      });
    },
    saveItem: (state, action) => {
      let index = action.payload.index;
      let id = action.payload.idItem;
      let name = action.payload.nameItem;
      let description = action.payload.description;
      let date = action.payload.date;
      let classChange = action.payload.classChange;
      let typeTask = action.payload.typeTask;
      state.map((item, i) => {
        if (item.idItem === id) {
          if (name) {
            item.name = name;
          }
          if (description) {
            item.description = description;
          }
          item.index = index;
          item.date = date;
          item.classChange = classChange;
          item.typeTask = typeTask;
        }
        return false;
      });
    },
    changeTypeTask: (state, action) => {
      let id = action.payload.idItem;
      let typeTask = action.payload.typeTask;
      state.map((item) => {
        item.classChange = '';
        if (item.idItem === id) {
          item.typeTask = typeTask;
        }
        return false;
      });
    },
    refreshData: (state, action) => {
      state.length = 0;
      action.payload.map((item, i) => {
        state.unshift(item);
        item.classChange = '';
        return false;
      });
    },
    refreshDataUserEmail: (state, action) => {
      state.length = 0;
      action.payload.map((item, i) => {
        if (item.userEmail === action.payload.userEmail) {
          state.unshift(item);
          item.classChange = '';
        }
        return false;
      });
    },
  },
});

export const borderSpace = (state) => state.board;

export const {
  addNewItem,
  removeItem,
  updateItem,
  saveItem,
  sortItemsUp,
  sortItemsDown,
  refreshData,
  refreshDataUserEmail,
  changeTypeTask,
  addNewItemType,
} = boardSlice.actions;

export default boardSlice.reducer;
