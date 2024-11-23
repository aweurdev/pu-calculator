import React from 'react';
import Select from 'react-select';

export default function ItemSelector({ options, onSelect }) {
  return (
    <Select
      options={options.map((item) => ({ value: item, label: item.name }))}
      onChange={(selected) => onSelect(selected.value)}
      placeholder="Equip an item"
    />
  );
}
