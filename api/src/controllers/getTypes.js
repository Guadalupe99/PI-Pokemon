const axios = require('axios');
const { Type } = require('../db');
const { API_TYPE } = process.env;

const getTypes = async () => {

    // Hacemos la solicitud a la pai
    const response = await axios.get(API_TYPE);

    // Asignamos el array de tipos a la variable
    const typesAPI = response.data.results;

    //Iteramos sobre cada tipo y si no existe en la DB lo creamos
    typesAPI.forEach((type) => {
        Type.findOrCreate({
            // findOrCreate -> busca un elemento en una base de datos y, si no se encuentra, lo crea. En esencia, combina las acciones de búsqueda y creación en una sola operación.
            
            where: {
                nam: type.name,
            },
        });
    });

    return 'typesCreated';
};

module.exports = getTypes;