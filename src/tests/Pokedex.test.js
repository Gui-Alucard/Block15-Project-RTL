import React from 'react';
import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Test Pokedex.js', () => {
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
    151: false,
  };
  test('should have a button with "Próximo pokémon" text', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const btn = getByTestId('next-pokemon');
    expect(btn).toBeInTheDocument();
    expect(btn.innerHTML).toBe('Próximo pokémon');
  });

  test('should pass one by one on click button', () => {
    const { queryByText, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const btn = getByTestId('next-pokemon');
    // faço um map pra pegar todos os nomes
    const allPokeNames = pokemons.map((poke) => poke.name);
    // dai, pra cada nome, eu pego aquele nome e espero que esteja na minha pokedex
    // entao, eu clico no btn e verifico se aquele (pokemon)name está o DOC
    allPokeNames.forEach((eachName) => {
      const eachPokeName = queryByText(eachName);
      expect(eachPokeName).toBeInTheDocument();
      userEvent.click(btn);
      const afterBtnClick = queryByText(eachName);
      expect(afterBtnClick).not.toBeInTheDocument();
    });
  });

  test('should return to the first pokemon when the list ends', () => {
    const { queryByText, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const btn = getByTestId('next-pokemon');
    // Conferi o codigo do Rafael Gelatti (https://github.com/tryber/sd-06-project-react-testing-library/blob/rafaelgelatti-react-testing-library-project/src/tests/Pokedex.test.js)
    // Acrescentei o forEach de acordo com ele, porque não tem como o test saber em que o click está acontecendo. Ainda meio turvo a explicação!!!
    const pikachu = pokemons[0];
    pokemons.forEach(() => {
      userEvent.click(btn);
    });
    const loopedPokemon = queryByText(/Pikachu/i);
    expect(loopedPokemon.innerHTML).toBe(pikachu.name);
  });

  it('should render only one pokemon at time', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    // Se tivesse mais que 1 pokemon quebraria porque estou expecting o 1º pokemon (Pikachu)
    const pokemon = getByTestId('pokemon-name');
    // .innerHTML pois pokemon é um elemento
    expect(pokemon.innerHTML).toBe('Pikachu');
    expect(pokemon.innerHTML).not.toBe('Alakazam');
  });

  test('should render a type buttons', () => {
    const { getAllByTestId, queryByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    // button type é renderizado?!
    const btnType = getAllByTestId('pokemon-type-button');
    const oneOfEach = [
      'Pikachu',
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Snorlax',
      'Dragonair',
    ];
    // link do repositório de exemplo (https://github.com/tryber/sd-06-project-react-testing-library/blob/rafaelgelatti-react-testing-library-project/src/tests/Pokedex.test.js)
    // tenho que fazer um forEach por causa da obrigação de um return em outros HOF's
    // Rafael Gelatti me ajudou nesse trecho (95 to 117) e me explicou que oneOfEach tem o mesmo lenght que os types dos buttons
    // assim o btnType[0] será o oneOfEach[0]
    oneOfEach.forEach((pokeName, index) => {
      userEvent.click(btnType[index]);
      expect(queryByText(pokeName)).toBeInTheDocument();
    });
    const types = [];
    btnType.forEach((type) => {
      types.push(type.innerHTML);
    });
    types.forEach((type, index) => {
      expect(btnType[index].innerHTML).toBe(type);
    });
  });

  test('should render only one type of pokemon if type button get clicked', () => {
    const { getAllByTestId, getByTestId, queryByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    // button type é renderizado?!
    const btnType = getAllByTestId('pokemon-type-button');
    const btnPsy = btnType[4];

    // Apos o click no tipo, o 1º pokemon daquele tipo renderiza?!
    userEvent.click(btnPsy);
    const alakazam = queryByText(/Alakazam/i);
    expect(alakazam).toBeInTheDocument();

    // button next é renderizado?!
    const btn = getByTestId('next-pokemon');

    // Apos o click next, alakazam some e mew renderiza?!
    userEvent.click(btn);
    const alakazamAfterClick = queryByText(/Alakazam/i);
    const mew = queryByText(/Mew/i);
    expect(alakazamAfterClick).not.toBeInTheDocument();
    expect(mew).toBeInTheDocument();
  });

  test('should appear a button ALL everytime', () => {
    const { queryAllByTestId, queryAllByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const btnType = queryAllByTestId('pokemon-type-button');

    // Para cada click em cada btn, tenho que testar se o 1º (indice 0) é o ALL
    btnType.forEach((btn) => {
      userEvent.click(btn);
      const allBtn = queryAllByRole('button');
      expect(allBtn[0]).toBeInTheDocument();
      expect(allBtn[0].innerHTML).toBe('All');
    });
  });

  test('should All button works well', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    // test se btn All está no DOC
    const btnAll = getByText(/All/i);
    expect(btnAll).toBeInTheDocument();
    expect(btnAll.innerHTML).toBe('All');

    userEvent.click(btnAll);
    expect(pokemons.length).toBeGreaterThan(1);
  });

  test('should disable "Next Pokemon" button when only on is available', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const btnType = getAllByTestId('pokemon-type-button');
    const btnNext = getByTestId('next-pokemon');

    // Para cada click em btn type, teste se, havendo um unico pokemon daquele tipo, DESATIVA o Next Pokemon button
    btnType.forEach((btn) => {
      userEvent.click(btn);
      if (btn.innerHTML === 'Fire' || btn.innerHTML === 'Psychic') {
        expect(btnNext).not.toBeDisabled();
      } else {
        expect(btnNext).toBeDisabled();
      }
    });
  });

  test('Encounter Pokémons', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});
