import * as _ from 'lodash';
import moment from 'moment-timezone';

export async function GetGroupMethod(start_date: string, end_date: string): Promise<string> {
  let group_method = 'hour';
  const startDate = moment(start_date).format('YYYY-MM-DD');
  const endDate = moment(end_date).format('YYYY-MM-DD');
  if (startDate && endDate && startDate !== endDate) {
    const start = moment(start_date);
    const end = moment(end_date);
    const diff_month = end.diff(start, 'months', true);
    group_method = diff_month >= 12 ? 'year' : diff_month > 1 ? 'month' : 'day';
  }
  return group_method;
}

/**
 * Converts a date string to a utc string of account time zone
 * @param input
 * @returns
 */
export function GetConvertedTimeZoneDateOfUTCString(
  input: string | Date,
  time_zone?: string,
): string {
  return moment.tz(input, time_zone ? time_zone : 'UTC').toISOString();
}

export async function monthDiff(d1: Date, d2: Date) {
  let months: number;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

export function generate_month(start_date: string, end_date: string) {
  const startDate = moment(start_date);
  const endDate = moment(end_date);

  const monthYearPairs = [];
  const currentDate = startDate;

  while (currentDate <= endDate) {
    const month = currentDate.month() + 1;
    const year = currentDate.year();
    monthYearPairs.push(`${month}-${year}`);

    currentDate.add(1, 'month');
    currentDate.date(1);
  }

  return monthYearPairs;
}

export function generate_year(start_date: string, end_date: string) {
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  let currentYear = startDate.getFullYear();
  const years = [];

  while (currentYear <= endDate.getFullYear()) {
    years.push(currentYear);
    currentYear++;
  }

  return years;
}

export function toHoursAndMinutes(totalMinutes) {
  const hours = _.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}:${minutes}`;
}

export function getUnixTimeDifferenceFromNow(time: number): number {
  const current_unix = Math.floor(Date.now() / 1000)
  return time - current_unix;
}

export function generateCronExpression(cronDateTime: Date): string {
  const parsed_date = moment(cronDateTime);
  const day_of_month = parsed_date.date();
  const day_of_week = parsed_date.day();
  const month = parsed_date.month();
  const hour = parsed_date.hour();
  const minute = parsed_date.minute();
  const second = parsed_date.second();

  if (parsed_date.isBefore(moment()) || parsed_date.isSame(moment())) {
    return 'fire';
  }

  return `${second} ${minute} ${hour} ${day_of_month} ${month} ${day_of_week}`;
}

export function isNumber(value): boolean {
  return !isNaN(value) && !isNaN(parseFloat(value));
}