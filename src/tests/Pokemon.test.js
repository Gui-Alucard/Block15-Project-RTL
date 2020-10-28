import React from 'react';
import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Test All requirements of Pokemon.js', () => {
  afterEach(cleanup);
  const isPokemonFavoriteById = {
    4: false,
    10: false,
    23: false,
    25: true,
    65: false,
    78: false,
    143: false,
    148: false,
    151: true, // true para testar se um unico poke foi renderizado
  };
  test('should render a card of selected pokemon', () => {
    const { getByText, queryByText, getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isPokemonFavoriteById[pokemons[0].id] }
      />,
    );
    // testa se pikachu é renderizado
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    expect(pikachu.innerHTML).toBe('Pikachu');
    // contra test para ver se apenas pikachu foi renderizado
    const mew = queryByText(/Mew/i);
    expect(mew).not.toBeInTheDocument();

    // Average weight test
    const weight = getByText(/Average weight: 6.0 kg/i);
    expect(weight).toBeInTheDocument();

    // Image testes
    const image = getByAltText(/Pikachu sprite/i);
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('should have a navigation link to details', () => {
    const { getByText, history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isPokemonFavoriteById[pokemons[0].id] }
      />,
    );
    const btnLink = getByText(/More details/i);
    userEvent.click(btnLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    expect(pathname).not.toBe('/pokemons/151');
  });

  test('should have a star icon in favorites', () => {
    const { getByAltText, queryByText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isPokemonFavoriteById[pokemons[0].id] }
      />,
    );
    const pikachuStar = getByAltText(/Pikachu is marked as favorite/i);
    const mewStar = queryByText(/Mew/i);
    expect(pikachuStar).toHaveAttribute('src', '/star-icon.svg');
    expect(mewStar).toBeNull();
  });
});
