import './App.scss';
import Board from './components/Board';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './components/Loading';
import useLocalStorage from 'use-local-storage';

const App = () => {
  const { isLoading } = useAuth0();
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage(
    'theme',
    defaultDark ? 'dark' : 'light'
  );

  return (
    <div className="App" data-theme={theme}>
      {isLoading ? <Loading /> : <Board theme={theme} setTheme={setTheme} />}
    </div>
  );
};

export default App;
