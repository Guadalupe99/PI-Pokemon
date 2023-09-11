import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Pagination.module.css';

const Pagination = ({ onPageChange, currentPage, perPage }) => {
     // onPageChange => función que se llama cuando el usuario hace clic en uno de los botones de paginación para cambiar la página
    //currentPage => página actual
    //perPage => cantidad de elementos por página

const totalPokemons = useSelector((state) => state.pokemons.pokemons.length);
const [totalPages, setTotalPages] = useState(0);
const [pageNumbers, setPageNumbers] = useState([]);

useEffect(() => {
    const calculatedTotalPages = Math.ceil(totalPokemons / perPage);
    setTotalPages(calculatedTotalPages);
}, [totalPokemons, perPage]);

useEffect(() => {
    const numbers = [];
    for (let i = 0; i < totalPages; i++) {
        numbers.push(i);
    }
    setPageNumbers(numbers);
}, [totalPages]);

return (
    <div className={ styles.paginationContainer }>
        {currentPage > 0 && (
            <button onClick={() => onPageChange(currentPage - 1)}
            className={ styles.paginationButton}> &#9664; </button>
             //  ' &#9664' se utiliza para mostrar una flecha hacia la izquierda que indica la acción de retroceder una página en la paginación.
        )}

        {pageNumbers.map((pageNumber) => (
            <button key={ pageNumber } onClick={() => onPageChange (pageNumber)} className={`${ styles.paginationButton } ${ pageNumber === currentPage ? styles.active : '' }`}>{pageNumber + 1}</button>
            // '{pageNumber + 1}' se utiliza para mostrar el número de página correspondiente en los botones de la paginación.
        ))}

        {currentPage < totalPages -1 && (
            <button onClick={() => onPageChange(currentPage + 1)} className={ styles.paginationButton}> &#9654; </button>
            //'&#9654' se utiliza para mostrar una flecha hacia la derecha que indica la acción de avanzar una página en la paginación.
        )}

    </div>
);
};

export default Pagination;