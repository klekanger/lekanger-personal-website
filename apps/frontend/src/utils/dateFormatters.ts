/**
 * Format a date string as "dd.mm.yy", Norwegian locale
 *
 * @param dateToFormat A date string in a valid format, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format
 * @returns a formatted short date, eg. "02.08.26"
 */
export function shortDate(dateToFormat: string) {
  const rawDate = new Date(dateToFormat);

  if (!(rawDate instanceof Date)) {
    console.warn("Invalid date");
    return "–";
  }

  const formattedDate = rawDate.toLocaleDateString("nb", {
    year: "2-digit",
    month: "2-digit",
    day: "numeric",
  });

  return formattedDate;
}

/**
 * Format a date as a long date, eg. "Tirsdag 14. august 2026"
 *
 * @param dateToFormat A date string in a valid format, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format
 * @returns a formatted short date, eg. "Tirsdag 14. august 2026"
 */
export function longDate(dateToFormat: string) {
  const rawDate = new Date(dateToFormat);

  if (!(rawDate instanceof Date)) {
    console.warn("Invalid date");
    return "–";
  }

  const formattedDate = rawDate.toLocaleDateString("nb", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate;
}
