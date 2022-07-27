import './App.scss';
import { Board } from './components/Board';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { Circles } from 'react-loader-spinner';

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="react-spinner">
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="App">
      <Board />
    </div>
  );
};

export default App;
