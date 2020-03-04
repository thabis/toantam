import moment from 'moment';

moment.updateLocale(moment.locale(), {
  relativeTime: {
    future: 'trong %s',
    past(number) {
      const day = 'ngày';
      const week = 'tuần';
      const splitByDay = number.split('ngày');
      const splitByWeeks = number.split('tuần');
      if (splitByDay.length > 1) {
        const dayCount = parseInt(splitByDay[0], 10);
        if (dayCount < 7) {
          return `${dayCount} ${day} trước`;
        }
        const weekCount = Math.round(dayCount / 7);
        return `${weekCount} ${week} trước`;
      }
      if (splitByWeeks.length > 1) {
        const weekCount = parseInt(splitByDay[0], 10);
        return `${weekCount} ${week} trước`;
      }
      return `${number} trước`;
    },
    s: '%d giây',
    m: '1 phút',
    mm: '%d phút',
    h: '1 giờ',
    hh: '%d giờ',
    d: '1 ngày',
    dd: '%d ngày',
    w: '1 tuần',
    ww: '%d tuần',
    M: '1 tháng',
    MM: '%d tháng',
    y: '1 năm',
    yy: '%% năm'
  }
});

export function caculateDateFollow(date_time) {
  const timeNow = moment();
  const dateItem = moment.parseZone(date_time).utcOffset(7);
  const dateNotFollow = moment.duration(timeNow.diff(dateItem));
  const totalDays = dateNotFollow.days() + (dateNotFollow.hours() / 24);
  return dateNotFollow.hours() > 0 ? totalDays.toFixed(1) : totalDays;
}

export function caculateDateFollowFrom(date_time) {
  const timeNow = moment();
  const dateItem = moment.parseZone(date_time).utcOffset(7);
  const dateNotFollow = moment.duration(timeNow.diff(dateItem));
  const months = dateNotFollow.months();
  const weeks = dateNotFollow.weeks();
  const days = dateNotFollow.days();
  const hours = dateNotFollow.hours();
  const minutes = dateNotFollow.minutes();

  if (months > 0) {
    return {
      value: months,
      type: 'm',
      typeName: 'tháng'
    };
  }

  if (weeks > 0) {
    return {
      value: weeks,
      type: 'w',
      typeName: 'tuần'
    };
  }

  if (days >= 2) {
    return {
      value: days,
      hours,
      type: 'd',
      typeName: 'ngày'
    };
  }

  if (hours > 0) {
    return {
      value: Math.round(hours + days * 24 + minutes / 60),
      type: 'h',
      typeName: 'giờ'
    };
  }

  if (minutes > 0) {
    return {
      value: minutes,
      type: 'm',
      typeName: 'phút'
    };
  }

  return null;
}

export const getDateFromNow = (numberDay, dateTime, distanceFormat = 7) => (
  numberDay > distanceFormat
    ? `${moment.parseZone(dateTime).utcOffset(7).format('DD-MM-YYYY h:mm a')}`
    : `${moment.parseZone(dateTime).utcOffset(7).fromNow()}`
);

export const getFromNow = dateTime => moment.parseZone(dateTime).utcOffset(7).fromNow();

export const formatDateTime = (dateTime, format = 'DD-MM-YYYY') => moment(dateTime).format(format);
