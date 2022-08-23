export interface DataProps {
  index: number;
  _id: any;
  idItem: any;
  nameItem: any;
  date: any;
  description: any;
  classChange: string;
  typeTask: any;
  userEmail: string | undefined;
}

export interface NotificationProps {
  type: string;
  text: string;
  button: string | boolean;
  links: any;
}

export interface FilterProps {
  setEndDate: any;
  setStartDate: any;
  setSmallBoardList: any;
  smallBoardList: Array<any>;
  boardList: Array<any>;
  startDate: Date;
  endDate: Date;
  filterTodoList: Array<any> | boolean;
  setFilterTodoList: any;
  filterProgressList: Array<any> | boolean;
  setFilterProgressList: any;
  filterDoneList: Array<any> | boolean;
  setFilterDoneList: any;
}

export interface HeadProps {
  setSmallBoardList: any;
  setStartDate: any;
  setEndDate: any;
  startDate: Date;
  endDate: Date;
  boardList: Array<any>;
  smallBoardList: Array<any>;
  filterTodoList: Array<any> | boolean;
  setFilterTodoList: any;
  filterProgressList: Array<any> | boolean;
  setFilterProgressList: any;
  filterDoneList: Array<any> | boolean;
  setFilterDoneList: any;
  setTheme: any;
  theme: string;
  setSearchValue: any;
}

export interface CustomInputProps {
  value: string;
  onClick: React.MouseEventHandler<HTMLElement>;
}

export interface LoadItemsButtonProps {
  listItems: Array<any>;
  typeList: Array<any>;
  setMaxList: any;
  setTypeList: any;
  maxList: number;
}

export interface SortsProps {
  setSmallBoardList: any;
  boardList: Array<any>;
}

export interface ThemeCheckboxProps {
  theme: string;
  setTheme: any;
}