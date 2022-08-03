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

const weekDay = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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
