import './index.scss';
import * as React from 'react';
import { ThemeCheckboxProps } from '../../interfaces/interfaces';

const ThemeCheckbox: React.FC<ThemeCheckboxProps> = ({ theme, setTheme }) => {
  const onChange = (): void => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="theme-checkbox">
      <div className="theme-checkbox__wrapper">
        <div className="theme-checkbox__button" tabIndex={0}>
          <input
            type="checkbox"
            className="theme-checkbox__checkbox"
            onChange={onChange}
            value={theme === 'dark' ? 'true' : 'false'}
            checked={theme === 'dark' ? true : false}
          />
          <div className="theme-checkbox__knobs"></div>
          <div className="theme-checkbox__layer"></div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCheckbox;
