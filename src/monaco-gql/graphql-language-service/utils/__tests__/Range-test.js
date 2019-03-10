/**
 *  Copyright (c) Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import { Range, Position, offsetToPosition, locToRange } from '../Range';

const text = `query test {
  name
}`;
const absRange = { start: 15, end: 18 }; // position of 'name' attribute in the test query
const offsetRangeStart = new Position(1, 2);
const offsetRangeEnd = new Position(1, 5);

describe('Position', () => {
  it('constructs a Position object', () => {
    const pos = new Position(3, 5);
    expect(pos).toBeDefined();
    expect(pos.character).toEqual(5);
    expect(pos.line).toEqual(3);
  });

  it('compares Position objects', () => {
    const posA = new Position(1, 2);
    const posB = new Position(2, 2);
    const posC = new Position(2, 3);
    expect(posA.lessThanOrEqualTo(posB)).toEqual(true);
    expect(posB.lessThanOrEqualTo(posC)).toEqual(true);
    expect(posC.lessThanOrEqualTo(posA)).toEqual(false);
  });
});

describe('Range', () => {
  let start;
  let end;
  let range;

  beforeEach(() => {
    start = new Position(2, 3);
    end = new Position(2, 5);
    range = new Range(start, end);
  });

  it('constructs a Range object', () => {
    expect(range).toBeDefined();
    expect(range.start).toEqual(start);
    expect(range.end).toEqual(end);
  });

  it('checks if it contains certain position', () => {
    const posA = new Position(2, 4);
    const posB = new Position(3, 5);
    expect(range.containsPosition(posA)).toEqual(true);
    expect(range.containsPosition(posB)).toEqual(false);
  });
});

describe('offsetToPosition()', () => {
  it('returns the offset to a position', () => {
    const position = offsetToPosition(text, absRange.start);
    expect(position.character).toEqual(offsetRangeStart.character);
    expect(position.line).toEqual(offsetRangeStart.line);
  });
});

describe('locToRange()', () => {
  it('returns the range for a location', () => {
    const range = locToRange(text, absRange);
    expect(range.start.character).toEqual(offsetRangeStart.character);
    expect(range.start.line).toEqual(offsetRangeStart.line);
    expect(range.end.character).toEqual(offsetRangeEnd.character);
    expect(range.end.line).toEqual(offsetRangeEnd.line);
  });
});
