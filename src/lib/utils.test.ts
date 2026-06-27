import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('should merge tailwind classes correctly', () => {
    const result = cn('text-red-500', 'text-blue-500');
    // twMerge will resolve conflicts by picking the later class
    expect(result).toBe('text-blue-500');
  });

  it('should handle conditional classes using clsx format', () => {
    const isError = true;
    const isSuccess = false;
    const result = cn(
      'p-4',
      isError && 'bg-red-500',
      isSuccess && 'bg-green-500',
      { 'text-white': true, 'font-bold': false }
    );
    expect(result).toBe('p-4 bg-red-500 text-white');
  });

  it('should ignore falsy values', () => {
    const result = cn('text-sm', null, undefined, false, 0, '', 'text-lg');
    expect(result).toBe('text-lg');
  });

  it('should merge array of classes correctly', () => {
    const result = cn(['text-sm', 'font-bold'], 'p-4');
    expect(result).toBe('text-sm font-bold p-4');
  });
});
