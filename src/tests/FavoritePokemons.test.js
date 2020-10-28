import React from 'react';
import { cleanup } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Test Favorite Pokemons', () => {
  afterEach(cleanup);
  test('should render "No favorite pokemon found" if no favorites', () => {
    const favorites = [];
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ favorites } />);
    const noFavorite = getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });

  test('should render all favorites Pokemons', () => {
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );
    const favorites = getAllByTestId('pokemon-name');
    expect(favorites[0]).toHaveTextContent(/Pikachu/i);
    expect(favorites[4]).toHaveTextContent(/Alakazam/i);
  });
});
