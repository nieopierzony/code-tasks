'use strict';

// Delete listed keys from dictionary
const drop = (obj, badKeys) => {
  const entries = Object.entries(obj);
  const result = Object.fromEntries(entries.filter(([key]) => !badKeys.includes(key)));
  return result;
};

const result = drop({ a: 'uno', b: 'due', c: 'tre' }, ['b', 'f']);
console.log(result);
