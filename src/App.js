import React, { useState } from 'react';
import { pokemons, items } from './data'; // Importation des données
import PokemonSelector from './components/PokemonSelector'; // Composant pour sélectionner un Pokémon
import ItemSelector from './components/ItemSelector'; // Composant pour équiper des objets

// Fonction utilitaire pour recalculer les stats avec les objets équipés
function calculateStats(baseStats, equippedItems) {
  return equippedItems.reduce(
    (updatedStats, item) => ({
      hp: updatedStats.hp + (item.effect.hp || 0),
      attack: updatedStats.attack + (item.effect.attack || 0),
      defense: updatedStats.defense + (item.effect.defense || 0),
      spAttack: updatedStats.spAttack + (item.effect.spAttack || 0),
      spDef: updatedStats.spDef + (item.effect.spDef || 0),
      critRate: updatedStats.critRate + (item.effect.critRate || 0),
      cdr: updatedStats.cdr + (item.effect.cdr || 0),
      lifesteal: updatedStats.lifesteal + (item.effect.lifesteal || 0),
      attackSpeed: updatedStats.attackSpeed + (item.effect.attackSpeed || 0),
      moveSpeed: updatedStats.moveSpeed + (item.effect.moveSpeed || 0),
    }),
    { ...baseStats } // On part des stats de base
  );
}

function App() {
  // États pour les deux Pokémon sélectionnés
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);

  // États pour les objets équipés par chaque Pokémon
  const [pokemon1Items, setPokemon1Items] = useState([]);
  const [pokemon2Items, setPokemon2Items] = useState([]);

  // Gestion des objets équipés (3 slots max)
  const handleItemEquip = (pokemonItems, setPokemonItems, item) => {
    if (pokemonItems.length < 3) {
      setPokemonItems([...pokemonItems, item]);
    }
  };

  // Recalcul des stats après équipement des objets
  const pokemon1Stats = pokemon1
    ? calculateStats(pokemon1.baseStats, pokemon1Items)
    : null;
  const pokemon2Stats = pokemon2
    ? calculateStats(pokemon2.baseStats, pokemon2Items)
    : null;

  return (
    <div className="App">
      <h1>Pokémon Damage Calculator</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        {/* Section Pokémon 1 */}
        <div>
          <h3>Pokémon 1</h3>
          <PokemonSelector options={pokemons} onSelect={(p) => setPokemon1(p.value)} />
          {pokemon1 && (
            <div>
              <img src={`/images/${pokemon1.image}`} alt={pokemon1.name} />
              <h4>{pokemon1.name}</h4>
              <p>HP: {pokemon1Stats.hp}</p>
              <p>Attack: {pokemon1Stats.attack}</p>
              <p>Defense: {pokemon1Stats.defense}</p>
              <p>Sp. Attack: {pokemon1Stats.spAttack}</p>
              <p>Sp. Defense: {pokemon1Stats.spDef}</p>
              <p>Crit Rate: {pokemon1Stats.critRate}%</p>
              <p>CDR: {pokemon1Stats.cdr}%</p>
              <p>Lifesteal: {pokemon1Stats.lifesteal}%</p>
              <p>Attack Speed: {pokemon1Stats.attackSpeed}</p>
              <p>Move Speed: {pokemon1Stats.moveSpeed}</p>
              <h4>Items:</h4>
              {pokemon1Items.map((item, index) => (
                <p key={index}>{item.name}</p>
              ))}
              <ItemSelector
                options={items}
                onSelect={(item) => handleItemEquip(pokemon1Items, setPokemon1Items, item)}
              />
            </div>
          )}
        </div>

        {/* Section Pokémon 2 */}
        <div>
          <h3>Pokémon 2</h3>
          <PokemonSelector options={pokemons} onSelect={(p) => setPokemon2(p.value)} />
          {pokemon2 && (
            <div>
              <img src={`/images/${pokemon2.image}`} alt={pokemon2.name} />
              <h4>{pokemon2.name}</h4>
              <p>HP: {pokemon2Stats.hp}</p>
              <p>Attack: {pokemon2Stats.attack}</p>
              <p>Defense: {pokemon2Stats.defense}</p>
              <p>Sp. Attack: {pokemon2Stats.spAttack}</p>
              <p>Sp. Defense: {pokemon2Stats.spDef}</p>
              <p>Crit Rate: {pokemon2Stats.critRate}%</p>
              <p>CDR: {pokemon2Stats.cdr}%</p>
              <p>Lifesteal: {pokemon2Stats.lifesteal}%</p>
              <p>Attack Speed: {pokemon2Stats.attackSpeed}</p>
              <p>Move Speed: {pokemon2Stats.moveSpeed}</p>
              <h4>Items:</h4>
              {pokemon2Items.map((item, index) => (
                <p key={index}>{item.name}</p>
              ))}
              <ItemSelector
                options={items}
                onSelect={(item) => handleItemEquip(pokemon2Items, setPokemon2Items, item)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
