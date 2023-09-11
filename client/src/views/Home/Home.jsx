import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons } from '../../redux/Actions/actions';

import SearchBar from '../../componentes/SearchBar/SearchBar';
import Cards from '../../componentes/Cards/Cards';
import Order from '../../componentes/Order/Order';
import Filter from '../../componentes/Filter/Filter';
import Pagination from '../../componentes/Pagination/Pagination';

import logo from '../../imagenes/Logo.jpg';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const allPokemons = useSelector((state) => state.pokemons.pokemons); //obtener todos los pokemons

    const perPage = 12;

    useEffect(() => {
        dispatch(getAllPokemons());
    }, [dispatch]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    //obtener los pokemons a mostrar en la pagina actual
    const startIndex = currentPage * perPage;
    const endIndex = startIndex + perPage;
    const pokemons = allPokemons.slice(startIndex, endIndex);

    return (
        <div className={ styles.container }>
            <img src={ logo } alt='Logo' className={ styles.logo } />
            <button className={ styles.button }>
                <Link to={`/form`} styles={{ textDecoration: 'none' }}>CREATE POKEMON</Link>
            </button>
            <SearchBar />
            <Order setPage={ handlePageChange } />
            <div>
                <Pagination onPageChange={ handlePageChange } currentPage={ currentPage } perPage={ perPage } />
            </div>
            <Filter setPage={ setCurrentPage } />
            <h1 className={ styles.titulo }>POKEMONS</h1>
            <Cards className={ styles.cards } pokemons={ pokemons } />
        </div>
    );
}

export default Home;