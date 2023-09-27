import Cards from '../../componentes/Cards/Cards';
import NavBar from '../../componentes/NavBar/NavBar';
import { Paginacion } from '../../componentes/Paginacion/Paginacion';
import { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes } from '../../redux/Actions/actions';
import style from './Home.module.css';

const Home = () => {
    const dispatch = useDispatch();
    //Obtenemos la lista de todos los pokemons
    const allPokemons = useSelector((state) => state.allPokemons);
    const pokemons = useSelector((state) => state.pokemons);

    // ____ PAGINADO____

    //uso useState para definir los estados locales del componente, tambien estas variables guardan el numero de la pagina actual
    const [currentPage, setCurrentPage] = useState(1);
    //Guarda la cantidad de pokemons que quiero mostrar por pagina
    const [perPage, setPerPage] = useState(12);

    //Cuando llamamos esta funcion con un numero de pagina, se actualiza la cantidad que se muestra por pagina y tambien cambia la pagina
    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
        // setPerPage(pageNumber === 1 ? 12 : 12);
    };

    //Compruebo si la pagina es la primera, si es asi devuelvo el index del ultimo pokemon alli, de lo contratio devuelvo el i del ultimo pokemon de la pagina donde este
    const indexOfLast =
    currentPage === 1 ? currentPage * perPage : currentPage * perPage - 1;
    
    //Resto para obtener el primer pokemon de la pagina actual
    const indexOfFirst =  indexOfLast - perPage;

    //Renderizo la lista de pokemons paginada, si tenemos la lista de pokemons completa, la cortamos para obtenes lo que corresponde y sino utilizamos la obtenida anteriormente
    const currentPokemons = pokemons.length
    ? pokemons.slice(indexOfFirst, indexOfLast)
    : allPokemons;

    //____PAGINADO____

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch]);

    return ( 
        <div className={ style.body}>
            <NavBar setCurrentPage={ setCurrentPage } />

            {!pokemons.length ? (
                <div className={style.espera}>
                    <h1>One moment, please</h1>
                    <img
                        src="https://media.tenor.com/8wfTNKNK99EAAAAi/snorlax-roll.gif"
                        alt='Loading' />
            </div>
            ) : (
                <div>
                    <Cards pokemons={currentPokemons}/>
                    <Paginacion
                    pokemons={pokemons.length}
                    pagination={pagination}
                    perPage={perPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage} />
                </div>
            )}
        </div>
    );
};

export default Home;

// .slice => se utiliza para extraer una porción de un array (arreglo) y crear un nuevo array que contiene los elementos seleccionados. . Este método no modifica el array original, sino que devuelve un nuevo array con los elementos que cumplen con los criterios especificados.
//es útil cuando deseas trabajar con una parte específica de un array sin alterar el array original. Puedes especificar un rango de índices para seleccionar los elementos que necesitas en un nuevo array. 