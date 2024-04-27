import moment from "moment";

export const formatDate = (date: string | Date): string => {
  return moment(new Date(date)).format("MM-DD-YYYY");
};

export const convertToNumber = (value: string | number): number => {
  const num = +value;

  return isNaN(num) ? 0 : num;
};
