export function formatDateTime(date: Date | undefined): string {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  if (date) {
    const dayOfWeek = days[date.getDay()];
    const month = months[date.getMonth()];

    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    let hour = date.getHours().toString().padStart(2, '0');
    let minute = date.getMinutes().toString().padStart(2, '0');

    const meridiem = hour < '12' ? 'AM' : 'PM';
    hour = (parseInt(hour) % 12).toString().padStart(2, '0');

    return `${day} ${month} ${year} ${hour}:${minute} ${meridiem} ${dayOfWeek}`;
  }
  return '';
}
