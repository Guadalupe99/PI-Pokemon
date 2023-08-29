require("dotenv").config();
const axios = require('axios');
const { API_URL } = process.env;
const { formatear, formatearTypes } = require('../Helpers/Helpers');
const { Pokemon, Type } = require('../db');

const getPokemonById = async (id) => {
    //Si el id es un numero traemos la data con axios y le damos el formato de objeto deseado
    if(!isNaN(id)) {
        const response = await axios.get(`${API_URL}/${id}`);
        return formatear(response.data);
    } else {
        //Sino es un numero lo buscamos en la DB por Primary Key
        const responseDB = await Pokemon.findByPk(id, {
            // findByPk se utiliza para recuperar un registro específico de una tabla de base de datos utilizando su clave primaria como criterio de búsqueda

            include: {
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            },
        });

        //Creamos una copia del objeto pokemon, lo convertimos en objeto plano y retornamos un array con el pokemon obtenido de la DB con sus tipos asociados
        if (responseDB) {
            return formatearTypes(responseDB);
        }

        return 'No se encontro el pokemon';
    }
};

module.exports = getPokemonById;