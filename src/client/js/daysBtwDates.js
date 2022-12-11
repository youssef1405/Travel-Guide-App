/**
 *
 * @param {*} date calue
 * @returns Number of of days between two the date argumnet and today's date
 */
const getDays = (date) => {
  const MILSECONDS_TO_DAYS = 86400000; // to convert millseconds to days
  const todayDate = new Date();
  date = new Date(date);
  return (
    (new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1) -
      new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        todayDate.getDate()
      ).getTime()) /
    MILSECONDS_TO_DAYS
  );
};

export { getDays };
