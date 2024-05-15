export const formattingToTheDisplayedDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    weekday: 'long',
    year: 'numeric',
    month: '2-digit',
  };
  const formattedDate = date.toLocaleDateString('en-GB', options);
  return formattedDate.replace(/\//g, '-');
};
