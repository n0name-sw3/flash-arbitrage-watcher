import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('rendering', () => {
  it('renders App', () => {
    expect.hasAssertions();
    const { getByText } = render(<App />);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
});
