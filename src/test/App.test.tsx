import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  it('renders without crashing', () => {
    // This will mount the React Router and layout wrappers.
    // We just want to ensure it doesn't throw an error like a white screen of death.
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });
});
