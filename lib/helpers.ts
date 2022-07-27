export function toDateTimeString(datetime: string) {
  const date = new Date(datetime);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return new Intl.DateTimeFormat(undefined, options).format(date);
}

export function parseAddress(address: string) {
  const arr = address.split(',');
  const street = arr[0];
  const city = arr.slice(1, -1).join(',');
  return { street, city };
}
