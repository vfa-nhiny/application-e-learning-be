export function sortObject(o) {
  // eslint-disable-next-line prefer-const
  let sorted = {},
    key,
    // eslint-disable-next-line prefer-const
    a = [];

  for (key in o) {
    if (o.hasOwnProperty(key)) {
      a.push(key);
    }
  }

  a.sort();

  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = o[a[key]];
  }
  return sorted;
}
