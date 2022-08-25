import './index.scss';
import * as React from 'react';
import { ThemeCheckboxProps } from '../../interfaces/interfaces';

const ThemeCheckbox = ({ theme, setTheme }: ThemeCheckboxProps) => {
  const onChange = (): void => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="theme-checkbox">
      <div className="theme-checkbox__wrapper">
        <div className="theme-checkbox__button" tabIndex={0}>
          <input
            type="checkbox"
            aria-label="change theme mode"
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
