'use strict';

const isObject = obj => typeof obj === 'object' && obj !== null;

// Only sync functions
const trySyncFunc = fn => {
  try {
    const data = fn();
    return [data, null];
  } catch (err) {
    return [null, err];
  }
};

const parseObject = (data, index) => {
  if (isObject(data)) return data;

  const [parsed, error] = trySyncFunc(() => JSON.parse(data));
  if (error) throw new Error(`JSON parsing failed ${!!index || index === 0 ? `on index ${index}` : ''}`);

  return parsed;
};

const addOffset = (obj, offset) => {
  for (const [key, val] of Object.entries(offset)) {
    if (typeof obj[key] !== typeof val) continue;
    obj[key] += val;
  }
  return obj;
};

const movePoints = (offset = {}, arr = []) => {
  // Validate input
  const isArrValid = Array.isArray(arr) && arr.every(el => isObject(el) || typeof el === 'string');
  const isOffsetValid = isObject && Object.values(offset).every(val => typeof val === 'number');

  if (!isOffsetValid || !isArrValid) throw new TypeError('Input data is invalid');

  // Normalize points: parse JSON where needed
  const parsed = arr.map((el, i) => parseObject(el, i));

  // Add offset to all objects
  const result = parsed.map(el => addOffset(el, offset));
  return result;
};

module.exports = { isObject, parseObject, addOffset, movePoints };
