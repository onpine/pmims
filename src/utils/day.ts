import dayjs from 'dayjs';

export const getTimeDifference = (first: any, last: any) => {
  const date1 = dayjs(first);
  const date2 = dayjs(last);
  let month = date1.diff(date2, "month");
  return month;
}