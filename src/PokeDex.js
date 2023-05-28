import React from "react";
import PokemonSelect from "./PokemonSelect";
import PokemonCard from "./PokemonCard";
import "./PokeDex.css";
import useAxios from "./hooks/useAxios";

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
function PokeDex() {
  const baseURL = 'https://pokeapi.co/api/v2/pokemon/'

  //based on API response, clean data according to our needs
  const formatPokemonData = (result) => (
    {
      front: result.sprites.front_default,
      back: result.sprites.back_default,
      name: result.name,
      stats: [...result.stats].map((stat)=> ({value: stat.base_stat, name: stat.stat.name}))
    }
  )

  const [pokemon, setPokemon, clearPokemon] = useAxios(baseURL, formatPokemonData);

  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        <PokemonSelect add={setPokemon} clear={clearPokemon} />
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map(cardData => (
          <PokemonCard
            key={cardData.id}
            front={cardData.front}
            back={cardData.back}
            name={cardData.name}
            stats={cardData.stats}
          />
        ))}
      </div>
    </div>
  );
}

export default PokeDex;

