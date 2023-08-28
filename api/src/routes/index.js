const axios = require('axios');
const { Router } = require("express");
const pokeRouter = require("./pokemonRouter"); //enrutadores modularizados
const typeRouter = require("./typeRouter"); //enrutadores modularizados


const router = Router();

router.use("/pokemons", pokeRouter); //Todas las solicitudes que comiencen con lo que está en comillas seran manejadas por pokeRouter, lo mismo aplica a typeRouter
router.use("/types", typeRouter);

module.exports = router;
