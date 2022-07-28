import './App.scss';
import Board from './components/Board';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './components/Loading';

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Board />
    </div>
  );
};

export default App;
