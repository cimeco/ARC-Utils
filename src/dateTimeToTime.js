import { DateTime as LuxonDateTime, Settings } from "luxon";

Settings.defaultLocale = "es";

export default (dateTime, timezone) => {
  const displayDate = LuxonDateTime.fromJSDate(dateTime, {
    zone: timezone || "America/Argentina/Buenos_Aires",
  });
  return displayDate.toFormat("HH:mm");
};
