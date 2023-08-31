import React from 'react';
import styles from './Cards.module.css';
import Card from '../Card/Card';

const Cards = ({ pokemons }) => {
    return (
        <div className={styles.CardsContainer}>
            {pokemons?.map((pokemon) => (
                <Card key={ pokemon.id } pokemon={ pokemon } />
            ))}
        </div>
    )
};

export default Cards;