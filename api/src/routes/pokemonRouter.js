const axios = require('axios');
const { Router } = require("express");

const pokeRouter = Router();

const getPokemonById = require("../controllers/getById");
const getAllPokemons = require("../controllers/getAll");
const getPokemonByName = require("../controllers/getByName");
const postPokemon = require("../controllers/post");

pokeRouter.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      const response = await getAllPokemons();
      return res.status(200).json(response);
    }

    const pokemon = await getPokemonByName(name);
    return res.status(200).json(pokemon);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

pokeRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pokemon = await getPokemonById(id);
    return res.status(200).json(pokemon);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

pokeRouter.post("/", async (req, res) => {
  const { name, image, hp, attack, defense, speed, height, weight, types } =
    req.body;
  try {
    const newPokemon = await postPokemon(
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      types
    );

    return res.status(200).json(newPokemon);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = pokeRouter;