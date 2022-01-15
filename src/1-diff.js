'use strict';

const isObject = obj => typeof obj === 'object' && !Array.isArray(obj) && obj !== null;

const diff = (oldObj, newObj) => {
  const diffs = {};

  for (const [key, oldProp] of Object.entries(oldObj)) {
    const newProp = newObj[key];

    if (oldProp === newProp) continue;

    // If types don't match, mark as diff
    if (typeof oldProp !== typeof newProp) {
      diffs[key] = { old: oldProp, new: newProp };
      continue;
    }

    // If all 2 values are arrays, check diffs
    const areArrays = Array.isArray(oldProp) && Array.isArray(newProp);
    if (areArrays) {
      const areEven = oldProp.every((oldValue, i) => oldValue === newProp[i]);
      if (!areEven) diffs[key] = { old: oldProp, new: newProp };
      continue;
    }

    // If values are objects, use diff function again
    const areObjects = isObject(oldProp) && isObject(newProp);
    if (areObjects) {
      const objectDiffs = diff(oldProp, newProp);
      if (Object.keys(objectDiffs).length !== 0) diffs[key] = objectDiffs;
      continue;
    }
  }

  // If there are new fields in the new object
  for (const [key, newProp] of Object.entries(newObj)) {
    if (typeof oldObj[key] !== 'undefined') continue;
    diffs[key] = { old: oldObj[key], new: newProp };
  }
  return diffs;
};

// {
//     b: { old: 'due', new: undefined },
//     c: { old: undefined, new: 'tre' }
// }
console.log(diff({ a: 'uno', b: 'due' }, { a: 'uno', c: 'tre' }));

// {
//     a: { old: null, new: undefined },
//     b: { old: 123, new: '123' },
//     f: { b: { old: '123', new: 123 } }
// }
console.log(
  diff(
    { a: null, b: 123, c: [4, 4, 6, 2], d: 'str', f: { a: 'foo', b: '123' } },
    { b: '123', c: [4, 4, 6, 2], d: 'test', f: { a: 'foo', b: 123 } },
  ),
);
