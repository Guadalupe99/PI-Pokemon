import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cleanDetail, getDetail } from '../../redux/Actions/actions';
import styles from './Detail.module.css';


const Detail = () => {
    const { id } = useParams();
    const [loading, setLoading ] = useState(true);
    const pokemon = useSelector((state) => state.pokemonDetail);
    const dispatch = useDispatch();

    console.log(pokemon);
    useEffect(() => {
        dispatch(getDetail(id))
         .then(() => setLoading(false))
         .catch(() => setLoading(false));
        return () => dispatch (cleanDetail());
    }, [id, dispatch]);

    return (
        <div className={ styles.body }>
            <Link to='/home' className={ styles.link }>
                <button className={ styles.boton }>Home</button>
            </Link>
            <div className={ styles.container }>
                {loading ? (
                    <div className={ styles.detail }><h1>Loading</h1></div>
                ) : !pokemon.id ? (
                    <div><h1>The pokemon does7 not exist</h1></div>
                ): (
                  <div>
                    <div>
                        <h1>{pokemon.name}</h1>
                    </div>

                    <div className={ styles.detail }>
                        <div className={ styles.containerImg }>
                            <img src={ pokemon.image } alt={ pokemon.name } />
                        </div>
                    
                    <div>
                        <p>Id: {pokemon.id}</p>
                        <p>Health points: {pokemon.hp}</p>
                        <p>Attack: {pokemon.attack}</p>
                        <p>Defense: {pokemon.defense}</p>
                        <p>Speed: {pokemon.speed}</p>
                        <p>Height: {pokemon.height}</p>
                        <p>Weight: {pokemon.weight}</p>
                        <p>
                            {' '}
                            Type/s:
                            {pokemon.types?.map((type) => {
                                return (
                                    <ul>
                                        <li key={pokemon.type}>{type}</li>
                                    </ul>
                                );
                            })}
                        </p>
                    </div>
                  </div>
                 </div>
                )}
            </div>
        </div>
    );
};

export default Detail;