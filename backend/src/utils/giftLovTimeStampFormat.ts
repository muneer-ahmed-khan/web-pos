import moment from "moment";

export const giftLovTimeStampFormat = (timezone: number): string => {
  const currentDateTime = moment();

  // adjust the timezone offset
  const timezoneDateTime = currentDateTime.utcOffset(timezone * 60); // Convert hours to minutes

  // get timezone date and time
  const timezoneYear = timezoneDateTime.format("YYYY");
  const timezoneMonth = timezoneDateTime.format("MM");
  const timezoneDay = timezoneDateTime.format("DD");
  const timezoneHours = timezoneDateTime.format("HH");
  const timezoneMinutes = timezoneDateTime.format("mm");
  const timezoneSeconds = timezoneDateTime.format("ss");

  // construct the gift lov format: ddMMyyyyHHmmss
  const formattedDateTime = `${timezoneDay}${timezoneMonth}${timezoneYear}${timezoneHours}${timezoneMinutes}${timezoneSeconds}`;

  return formattedDateTime;
};
