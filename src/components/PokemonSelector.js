import React from 'react';
import Select from 'react-select';

export default function PokemonSelector({ options, onSelect }) {
  const handleChange = (selectedOption) => {
    onSelect(selectedOption);
  };

  return (
    <Select
      options={options.map((pokemon) => ({ value: pokemon, label: pokemon.name }))}
      onChange={handleChange}
      placeholder="Select a Pokémon"
    />
  );
}
