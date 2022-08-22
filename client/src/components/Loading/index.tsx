import * as React from 'react';
import './index.scss';
import { Circles } from 'react-loader-spinner';

const Loading: React.FC = () => {
  return (
    <div className="react-spinner">
      <Circles
        height="80"
        width="80"
        color="currentColor"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
