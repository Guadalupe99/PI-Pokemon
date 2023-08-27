const { Pokemon } = require("../db");

const postPokemon = async (
  name,
  image,
  hp,
  attack,
  defense,
  speed,
  height,
  weight,
  types
) => {
  // Si no están todos los parametros requeridos -> error
  if (
    !name ||
    !image ||
    !hp ||
    !attack ||
    !defense ||
    !speed ||
    !height ||
    !weight ||
    !types
  )
    throw new Error("There is not all the required information");

  //Consultamos a la DB si ya existe un pokemon con el mismo nombre, si existe -> error
  const existPokemon = await Pokemon.findOne({
    // //findOne -> busca y obtiene un único documento que cumple con los criterios de búsqueda en una base de datos o colección de datos
    
    where: { name: name },
  });

  if (existPokemon)
    throw new Error(
      "The name of this pokemon already exists, please try another name"
    );

  // Sino lo creamos
  const newPokemon = await Pokemon.create({
    name,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
  });

  //Asociamos los tipos proporcionados al nuevo pokemon
  await newPokemon.addTypes(types);

  return newPokemon;
};

module.exports = postPokemon;

