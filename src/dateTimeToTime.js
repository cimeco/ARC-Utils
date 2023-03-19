import moment from 'moment';
import 'moment-timezone';

moment.locale('es');

const TIME_FORMAT = 'HH:mm';

export default (dateTime, timezone = 'America/Argentina/Buenos_Aires') => {
  const displayDate = moment(dateTime).tz(timezone);
  return displayDate.format(TIME_FORMAT);
};
