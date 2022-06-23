import 'moment/locale/es';
import moment from 'moment';

export default function dateTimeToTime(dateTime, timezone) {
  moment.locale('es');
  const displayDate = moment(dateTime).tz(
    timezone || 'America/Argentina/Buenos_Aires'
  );
  return displayDate.format('HH:mm');
}
