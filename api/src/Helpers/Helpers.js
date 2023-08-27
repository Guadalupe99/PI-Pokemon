const formatear = (pokemon) => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.other.home.front_default,
      hp: pokemon.stats[0].base_stat,
      attack: pokemon.stats[1].base_stat,
      defense: pokemon.stats[2].base_stat,
      speed: pokemon.stats[5].base_stat,
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types.map((type) => type.type.name),
    };
  };
  
  const formatearTypes = (pokemonDB) => {
    return {
      ...pokemonDB.toJSON(),
      types: pokemonDB.types.map((type) => type.name),
    };
  };
  
  module.exports = { formatear, formatearTypes };

  