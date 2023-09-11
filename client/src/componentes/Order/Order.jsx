import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterPokemon } from '../../redux/Actions/actions';
import styles from './Order.module.css';

const Order = ({ setPage }) => {
    const searchPokemon = useSelector((state) => state.pokemons.pokemons);
    const dispatch = useDispatch();
    const hasMultiplePokemons = searchPokemon.length > 1;

    const handleFilter = (event) => {
        setPage(0);
        dispatch(filterPokemon(event.target.name));
    };

    return (
        <div className={ styles.buttonContainer }>

            {hasMultiplePokemons &&(
                <button className={ styles.button } name='aToZ' onClick={ handleFilter }>Ordenar A-Z</button>
            )}

            {hasMultiplePokemons && (
                <button className={ styles.button } name='zToA' onClick={ handleFilter }>Ordenar Z-A</button>
            )}

            {hasMultiplePokemons && (
                <button className={ styles.button } name='ataqueDesc' onClick={ handleFilter }>Ordernar por Ataque (Descendente)</button>
            )}

            {hasMultiplePokemons && (
                <button className={ styles.button } name='ataqueAsc' onClick={ handleFilter}>Ordenar por Ataque (Ascendente)</button>
            )}

        </div>
    );
};

export default Order;