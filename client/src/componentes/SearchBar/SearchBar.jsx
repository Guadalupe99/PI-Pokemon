import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getByName } from '../../redux/Actions/actions';
import styles from './SearchBar.module.css';

const SearchBar = () =>  {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    
    const handleSearch = () => {
        dispatch(getByName(event.target.value));
    };
    
    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    }
    
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className={styles['search-bar']}>
            <input
            type='text'
            placeholder='Buscar por nombre...'
            value={searchQuery}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            className={styles.input}
            />
            <button onClick={handleSearch} className={styles.button}>Buscar</button>
        </div>
    );
}

export default SearchBar;