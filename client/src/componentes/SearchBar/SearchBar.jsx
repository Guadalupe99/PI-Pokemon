import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getName } from '../../redux/Actions/actions';
import styles from './SearchBar.module.css';

const SearchBar = ({ setCurrentPage }) => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        event.preventDefault();
        setSearch(event.target.value);
    };

    const submit = async (event) => {
        event.preventDefault();
        if (search.length > 0) {
            try {
                await dispatch(getName(search.toLowerCase()));
                setSearch('');
                setCurrentPage(1);
            } catch (error) {
                alert('Pokemons not found');
            }
        }
    };

    return(
        <div>
            <form onSubmit={ submit }>
                <div className={ styles.cnotainer }>
                    <input
                    type='search'
                    onChange={ handleChange }
                    value={ search }
                    placeholder='Search your pokemon...'
                    className={ styles.inputs } />
                    <button disabled={ isLoading }>Find!</button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;





//toLowerCase => se utiliza para convertir una cadena de texto en minúsculas

//preventDefault => se utiliza para detener o prevenir el comportamiento predeterminado asociado a un evento en un elemento HTML, lo que te permite controlar y personalizar cómo se maneja ese evento en tu código.

//disabled => se utiliza para indicar que un elemento de formulario o un elemento interactivo no está habilitado o activo... (puedes utilizar la propiedad "disabled" en un botón para deshabilitarlo y evitar que el usuario lo presione hasta que se cumplan ciertas condiciones o se realice alguna acción específica.)