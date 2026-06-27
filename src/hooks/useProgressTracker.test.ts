import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProgressTracker } from './useProgressTracker';

describe('useProgressTracker', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with default progress', () => {
    const { result } = renderHook(() => useProgressTracker());
    
    expect(result.current.progress).toEqual({
      completedTopics: [],
      bookmarkedTopics: [],
      mockTestScores: {},
      lastVisited: null,
    });
  });

  it('should initialize with stored progress from localStorage', () => {
    const mockStoredData = {
      completedTopics: ['topic-1'],
      bookmarkedTopics: ['topic-2'],
      mockTestScores: { 1: 10 },
      lastVisited: '/some-path',
    };
    localStorage.setItem('prepPlatformProgress', JSON.stringify(mockStoredData));

    const { result } = renderHook(() => useProgressTracker());
    expect(result.current.progress).toEqual(mockStoredData);
  });

  it('should mark a topic as completed', () => {
    const { result } = renderHook(() => useProgressTracker());
    
    act(() => {
      result.current.markTopicCompleted('topic-1');
    });
    expect(result.current.progress.completedTopics).toContain('topic-1');

    // Should not add duplicates
    act(() => {
      result.current.markTopicCompleted('topic-1');
    });
    expect(result.current.progress.completedTopics.length).toBe(1);
  });

  it('should toggle a bookmark', () => {
    const { result } = renderHook(() => useProgressTracker());
    
    act(() => {
      result.current.toggleBookmark('topic-1');
    });
    expect(result.current.progress.bookmarkedTopics).toContain('topic-1');

    act(() => {
      result.current.toggleBookmark('topic-1');
    });
    expect(result.current.progress.bookmarkedTopics).not.toContain('topic-1');
  });

  it('should update mock test score', () => {
    const { result } = renderHook(() => useProgressTracker());
    
    act(() => {
      result.current.updateMockTestScore(1, 85);
    });
    expect(result.current.progress.mockTestScores[1]).toBe(85);

    act(() => {
      result.current.updateMockTestScore(1, 95);
    });
    expect(result.current.progress.mockTestScores[1]).toBe(95);
  });

  it('should set last visited path', () => {
    const { result } = renderHook(() => useProgressTracker());
    
    act(() => {
      result.current.setLastVisited('/dashboard');
    });
    expect(result.current.progress.lastVisited).toBe('/dashboard');
  });
});
