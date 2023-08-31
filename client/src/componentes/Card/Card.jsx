import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

const Card = ({ pokemon }) => {
    const { id, image, name, types } = pokemon

    return (
        <div className={styles['card-container']}>
            <Link to ={`pokemons/${id}`} style={{ textDecoration: 'none' }}>
                <div className={styles['img-container']}>
                    <img src={image} alt='imagePokemon' className={styles['image']} />
                </div>
                <div className={styles['card-info']}>
                    <h2 className={styles['card-title']}>{name.toUpperCase()}</h2>
                    <p className={styles['card-subtitle']}> {types?.join(',')}</p>
                </div>
            </Link>
        </div>
    )
};

export default Card;