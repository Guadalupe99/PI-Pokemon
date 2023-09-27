import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { order, filter, create } from '../../redux/Actions/actions';
import { getPokemons } from '../../redux/Actions/actions';

const NavBar = ({ setCurrentPage }) => {
    const dispatch = useDispatch();
    const { pokemonsTypes } = useSelector((state) => state);

    const filterType = (event) => {
        event.preventDefault();

        const type = event.target.value;
        dispatch(filter(type));
        setCurrentPage(1);
    };

    const orderHandler = (event) => {
        event.preventDefault();
        dispatch(order(event.target.value));
        setCurrentPage(1);
    };

    const createHandler = (event) => {
        event.preventDefault();
        dispatch(create(event.target.value));
        setCurrentPage(1);
    };

    const handleReset = (event) => {
        event.preventDefault();
        dispatch(getPokemons());
    };

    return (
        <nav className={ styles.nav }>
            <select onChange={ filterType } className={ styles.btns }>
                <option value='All'>All types</option>
                {pokemonsTypes?.map((type) => {
                    return (
                        <option key={ type.id } name={ type.id } value={ type.name }>{type.name}</option>
                    );
                })}
            </select>

            <select onChange={(event) => orderHandler(event)} className={ styles.btns }>
                <option value="none">Order</option>
                <option value="A">A-Z</option>
                <option value="D">Z-A</option>
                <option value="W">Weakness</option>
                <option value="S">Strong</option>
            </select>

            <select onChange={(event) => createHandler(event)} className={styles.btns}>
                <option value="All">All</option>
                <option value="Creado">Creado</option>
                <option value="Api">Api</option>
            </select>

            <button className={ styles.btns }>
                <Link yo={ '/create' } className={ styles.links }>Create pokemon</Link>
            </button>

            <button className={ styles.btns } onClick={ handleReset }>Reset</button>

            <SearchBar setCurrentPage={ setCurrentPage } />
        </nav>
    );
};

export default NavBar;