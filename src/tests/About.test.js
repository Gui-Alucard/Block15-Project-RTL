import React from 'react';
import { cleanup } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Test About page', () => {
  afterEach(cleanup);
  test('should contain informations about Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const aboutPage = getByText(/About Pokédex/i, { selector: 'h2' });
    // const aboutPage = getByRole('heading', { name: /About Pokédex/i });
    expect(aboutPage).toBeInTheDocument();

    const paragOne = getByText(/This application simulates a Pokédex/i);
    expect(paragOne).toHaveTextContent(
      /This application simulates a Pokédex, a/,
      /digital encliclopedia containing all Pokémons/i,
    );

    const paragTwo = getByText(/One can filter Pokémons by type/i);
    expect(paragTwo).toHaveTextContent(
      /One can filter Pokémons by type,/,
      /and see more details for each one of them/i,
    );
  });

  test('should contain an image of a Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img', { src: 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
