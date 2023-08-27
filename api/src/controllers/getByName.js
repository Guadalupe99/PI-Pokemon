require("dotenv").config();
const axios = require("axios");
const { API_URL } = process.env;
const { formatear, formatearTypes } = require('../Helpers/Helpers');
const { Pokemon, Type } = require("../db");

const getName = async (name) => {
  //Buscamos el nombre del pokemon en la DB, si lo encontramos creamos una copia del objeto pokemon, lo convertimos en objeto plano y retornamos un array con el pokemon obtenido de la DB con sus tipos asociados
  const responseDB = await Pokemon.findOne({
    //findOne -> busca y obtiene un único documento que cumple con los criterios de búsqueda en una base de datos o colección de datos

    where: {
      name,
    },
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  if (responseDB) {
    return formatearTypes(responseDB);
  }
  //Si no es encontrado en la DB, se busca en la api y se le da el formato de objeto deseado
  const response = await axios.get(`${API_URL}/${name}`);

  return formatear(response.data);
};

module.exports = getName;