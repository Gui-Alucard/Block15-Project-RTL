import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Test render Not Found', () => {
  afterEach(cleanup);
  test('should have a h2 with "Page requested not found 😭" text', () => {
    const { getByText, getByAltText } = renderWithRouter(<NotFound />);
    const h2Text = getByText(/Page requested not found/i, { selector: 'h2' });
    expect(h2Text).toBeInTheDocument();
    expect(h2Text).toHaveTextContent(/Page requested not found 😭/i);
    const image = getByAltText(/Pikachu crying/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
