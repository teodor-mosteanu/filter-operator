import {
  matchEquals,
  matchGreaterThan,
  matchLessThan,
  matchAny,
  matchNone,
  matchIn,
  matchContains,
} from './filter-matchers';

describe('filter-matchers', () => {
  describe('matchEquals', () => {
    it('should return true for equal values', () => {
      expect(matchEquals('a', 'a')).toBe(true);
      expect(matchEquals(1, 1)).toBe(true);
    });
    it('should return false for non-equal values', () => {
      expect(matchEquals('a', 'b')).toBe(false);
      expect(matchEquals(1, 2)).toBe(false);
    });
  });

  describe('matchGreaterThan', () => {
    it('should return true if propValue > filterValue', () => {
      expect(matchGreaterThan(5, 3)).toBe(true);
    });
    it('should return false if propValue <= filterValue', () => {
      expect(matchGreaterThan(2, 3)).toBe(false);
      expect(matchGreaterThan(3, 3)).toBe(false);
    });
    it('should return false if propValue is not a number', () => {
      expect(matchGreaterThan('5', 3)).toBe(false);
    });
  });

  describe('matchLessThan', () => {
    it('should return true if propValue < filterValue', () => {
      expect(matchLessThan(2, 3)).toBe(true);
    });
    it('should return false if propValue >= filterValue', () => {
      expect(matchLessThan(3, 2)).toBe(false);
      expect(matchLessThan(3, 3)).toBe(false);
    });
    it('should return false if propValue is not a number', () => {
      expect(matchLessThan('2', 3)).toBe(false);
    });
  });

  describe('matchAny', () => {
    it('should return true for defined, non-empty values', () => {
      expect(matchAny('a')).toBe(true);
      expect(matchAny(0)).toBe(true);
    });
    it('should return false for undefined, null, or empty string', () => {
      expect(matchAny(undefined)).toBe(false);
      expect(matchAny(null)).toBe(false);
      expect(matchAny('')).toBe(false);
    });
  });

  describe('matchNone', () => {
    it('should return true for undefined, null, or empty string', () => {
      expect(matchNone(undefined)).toBe(true);
      expect(matchNone(null)).toBe(true);
      expect(matchNone('')).toBe(true);
    });
    it('should return false for defined, non-empty values', () => {
      expect(matchNone('a')).toBe(false);
      expect(matchNone(0)).toBe(false);
    });
  });

  describe('matchIn', () => {
    it('should return true if propValue is in filterValue array (number)', () => {
      expect(matchIn(2, [1, 2, 3], 'number')).toBe(true);
    });
    it('should return true if propValue is in filterValue array (enumerated)', () => {
      expect(matchIn('red', ['red', 'blue'], 'enumerated')).toBe(true);
    });
    it('should return true if propValue is in comma-separated string', () => {
      expect(matchIn('a', 'a,b,c', 'string')).toBe(true);
    });
    it('should return false if propValue is not in filterValue', () => {
      expect(matchIn('d', ['a', 'b', 'c'], 'string')).toBe(false);
      expect(matchIn(4, [1, 2, 3], 'number')).toBe(false);
    });
  });

  describe('matchContains', () => {
    it('should return true if propValue contains filterValue (case-insensitive)', () => {
      expect(matchContains('Headphones', 'phone')).toBe(true);
      expect(matchContains('Telephone', 'phone')).toBe(true);
    });
    it('should return false if propValue does not contain filterValue', () => {
      expect(matchContains('Keyboard', 'phone')).toBe(false);
    });
    it('should return false if propValue is not a string', () => {
      expect(matchContains(123, '23')).toBe(false);
    });
  });
});
