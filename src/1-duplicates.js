'use strict';

// Return an array without duplicates
const deleteDuplicates = arr => [...new Set(arr)];

const result = deleteDuplicates([1, 2, 1, 3, 1, 4]);
console.log(result);
