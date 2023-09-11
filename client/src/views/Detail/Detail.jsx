import React,{ useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDetails } from '../../redux/Actions/actions';
import { Link } from 'react-router-dom';
import styles from './Detail.module.css';

const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const details = useSelector((state) => state.pokemons.details);
    const error = useSelector((state) => state.pokemons.error);

    useEffect(() => {
        dispatch(getDetails(id));
    }, [dispatch, id]);

    if(error) {
        return (
            <div className={styles.errorContainer}>
                <h1>404 - {error}</h1>
            </div>
        );
    }

    if (!details) {
        return <div>Loading...</div>;
    }

    const { name, image, hp, attack, defense, speed, height, weight, type } = details;

    return (
        <div>
            <img
              src={ require('../../imagenes/pokemonLanding.jpg').default }
              alt='Imagen de fondo'
              className={ styles['background-image']}
              />
            
            <div className={ styles.container }>
                <h2>{ name }</h2>

                <img src={ image?.url } alt={ name } />

                <p>
                    <span className={ styles.bold }>Id:</span> { details.id }
               </p> 

               <p>
                    <span className= { styles.bold }>Vida:</span> { hp }
               </p>

               <p>
                    <span className={ styles.bold }>Ataque:</span> { attack } 
               </p>

               <p>
                    <span className={ styles.bold }>Defensa:</span> { defense }
               </p>
                
                {speed && (
                    <p> 
                        <span className={ styles.bold }>Velocidad</span> { speed }  
                    </p>
                )}
                {height && (
                    <p>
                        <span className={ styles.bold }>Altura:</span> { height }
                    </p>
                )}
                {weight && (
                    <p>
                        <span className={ styles.bold }>Peso:</span> { weight }
                        
                    </p>
                )}

                <p>
                    <span className={ styles.bold }>Type:</span> {' '}
                    {type?.join(', ')}
                </p>
                <div>
                    <Link to={`/home`}>
                        <button className={ styles.button }>HOME</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Detail;