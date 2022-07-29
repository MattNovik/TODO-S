import './index.scss';
import { Circles } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className="react-spinner">
      <Circles
        height="80"
        width="80"
        color="#441151"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading;