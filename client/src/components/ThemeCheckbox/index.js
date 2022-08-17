import './index.scss';

const ThemeCheckbox = ({ theme, setTheme }) => {
  const onChange = (e) => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="theme-checkbox">
      <div className="theme-checkbox__wrapper">
        <div className="theme-checkbox__button">
          <input
            type="checkbox"
            className="theme-checkbox__checkbox"
            onChange={onChange}
            value={theme === 'dark' ? true : false}
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
