import { describe, it, expect, vi, afterEach } from 'vitest';
import { generateCertificateId, formatDate } from './utils';

describe('Certificate Utils', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('generateCertificateId', () => {
    it('should generate an ID with the default prefix', () => {
      const id = generateCertificateId();
      const currentYear = new Date().getFullYear();
      
      expect(id).toMatch(new RegExp(`^PG-${currentYear}-[0-9A-F]{6}$`));
    });

    it('should generate an ID with a custom prefix', () => {
      const id = generateCertificateId('CUSTOM');
      const currentYear = new Date().getFullYear();
      
      expect(id).toMatch(new RegExp(`^CUSTOM-${currentYear}-[0-9A-F]{6}$`));
    });

    it('should generate unique IDs', () => {
      // Mock Math.random to return different values
      let randomValue = 0.1;
      vi.spyOn(Math, 'random').mockImplementation(() => {
        randomValue += 0.1;
        return randomValue;
      });

      const id1 = generateCertificateId();
      const id2 = generateCertificateId();
      
      expect(id1).not.toBe(id2);
    });
  });

  describe('formatDate', () => {
    it('should format a Date object correctly', () => {
      const date = new Date('2026-06-28T12:00:00Z');
      const formatted = formatDate(date);
      // Depending on timezone, could be June 28 or June 29.
      expect(formatted).toMatch(/June 28, 2026/);
    });

    it('should format a string date correctly', () => {
      const formatted = formatDate('2026-06-28T00:00:00Z');
      expect(formatted).toMatch(/June 28, 2026/);
    });

    it('should handle invalid dates gracefully (returns Invalid Date)', () => {
      const formatted = formatDate('invalid-date-string');
      expect(formatted).toBe('Invalid Date');
    });
  });
});
