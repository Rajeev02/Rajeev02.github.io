import React from 'react';
import { render, screen } from '@testing-library/react';
import { Certificate } from './Certificate';

describe('Certificate Component', () => {
  const mockProps = {
    name: 'Rajeev Joshi',
    assessmentTitle: 'System Design & Architecture',
    score: 3,
    totalQuestions: 3,
    level: 'Advanced',
    duration: 15,
    issuedDate: '2026-06-28T00:00:00.000Z',
    certificateId: 'PG-2026-TESTING',
    verificationUrl: 'https://rajeev02.github.io/#/verify/PG-2026-TESTING',
    skills: ['System Design', 'Architecture']
  };

  it('renders without crashing', () => {
    render(<Certificate {...mockProps} />);
    
    // Check if the user name is rendered
    expect(screen.getAllByText('Rajeev Joshi').length).toBeGreaterThan(0);
    
    // Check if assessment title is rendered
    expect(screen.getByText('System Design & Architecture')).toBeInTheDocument();
  });

  it('calculates and displays percentage correctly', () => {
    render(<Certificate {...mockProps} />);
    // 3 out of 3 is 100%
    expect(screen.getByText(/100%/)).toBeInTheDocument();
  });

  it('renders all skills passed in props', () => {
    render(<Certificate {...mockProps} />);
    expect(screen.getByText('System Design')).toBeInTheDocument();
    expect(screen.getByText('Architecture')).toBeInTheDocument();
  });
});
