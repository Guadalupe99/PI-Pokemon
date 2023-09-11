import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTypes, filterType } from '../../redux/Actions/actions';
import { getAllPokemons } from '../../redux/Actions/actions';
import styles from './Filter.module.css';

const Filter = ({ setPage }) => {
    const dispatch = useDispatch();
    const types = useSelector((state) => state.pokemons.types);
    const filter = useSelector((state) => state.pokemons.filter);
    const [selectedFilter, setSelectedFilter] = useState('');

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    const handleFilter = (temperament) => {
        setPage(0);
        dispatch(filterType(temperament));
    };

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedFilter(selectedValue);
        if (selectedValue === 'types') {
            dispatch(getAllPokemons())
        } else {
            handleFilter(selectedValue);
        }
    };

    useEffect(() => {
        setSelectedFilter(filter || 'types');
    }, [filter]);

    return (
        <div className={ styles.typesContainer }>
            <h3>Filtrar Por Tipos</h3>
            <div className={ styles.selectContainer }>
                <select value={ selectedFilter } onChange={ handleSelectChange } className={ styles.select }>
                    <option value='types'>All Types</option>
                    {types?.map((p) => (
                        <option key={p.id} value={p.name}>
                            {p.name.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Filter