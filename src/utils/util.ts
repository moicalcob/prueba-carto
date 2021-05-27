/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export function get_postgres_interval(step: string): string {
  switch (step) {
    case '1d':
      return '1 DAY';
    case '1w':
      return '1 WEEK';
    case '1h':
      return '1 HOUR';
    default:
      return '1 DAY';
  }
}
