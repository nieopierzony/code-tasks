'use strict';

const { movePoints } = require('./1-movePoints');

const polyline = [{ x: 0, y: 0 }, { x: 10, y: 10 }, '{ "x": 20, "y": 20 }', { x: 30, y: 30 }];
const result = movePoints({ x: 10, y: -5 }, polyline);

console.log({ polyline, result });
