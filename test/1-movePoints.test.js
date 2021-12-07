'use strict';

const { movePoints } = require('../src/1-movePoints');

// TODO: Add tests for another functions

describe('movePoints()', () => {
  test('given case study', () => {
    const offset = { x: 10, y: -5 };
    const input = [{ x: 0, y: 0 }, { x: 10, y: 10 }, '{ "x": 20, "y": 20 }', { x: 30, y: 30 }];
    const awaitedOutput = [
      { x: 10, y: -5 },
      { x: 20, y: 5 },
      { x: 30, y: 15 },
      { x: 40, y: 25 },
    ];

    expect(movePoints(offset, input)).toEqual(awaitedOutput);
  });
});
