import React from 'react';
import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Renderes the Pokédex', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = renderWithRouter(<App />);
    const subTitle = getByText(/Encountered pokémons/i);
    expect(subTitle).toBeInTheDocument();
  });
});

describe('Contain a fixed group os links', () => {
  afterEach(cleanup);
  test('First link should be "Home" with URL /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    userEvent.click(home);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/');
    expect(home).toBeInTheDocument();
  });

  test('Second link should be "About" with URL /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText(/About/i);
    userEvent.click(about);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/about');
    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  });

  test('Third link should be "Favorites" with URL /favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favorites = getByText(/Favorite Pokémons/i);
    userEvent.click(favorites);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/favorites');
    expect(favorites).toBeInTheDocument();
  });

  test('should render Not Found if unknown URL', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/someThing');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).not.toHaveTextContent('/', '/about', '/favorites');
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
