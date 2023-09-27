import React from 'react';
import Card from '../Card/Card';
import style from './Cards.module.css';

const Cards = ({ pokemons }) => {
    return (
        <div className={ style.container }>
            {pokemons.map((pokemon) => {
                return (
                    <Card 
                    name={ pokemon.name }
                    image={ pokemon.image }
                    types={ pokemon.types.join(' / ')}
                    key={ pokemon.id }
                    id={pokemon.id }
                    />
                );
            })}
        </div>
    );
};

export default Cards;