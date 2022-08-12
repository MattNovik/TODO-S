import './index.scss';

const month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Time = () => {
  const todayDate = new Date();
  const todayDateString =
    weekDay[todayDate.getDay()] +
    ' ' +
    todayDate.getDate() +
    ' ' +
    month[todayDate.getMonth()];

  return (
    <div className="time">
      <span>Today is:</span>
      <span>{todayDateString}</span>
    </div>
  );
};

export default Time;
