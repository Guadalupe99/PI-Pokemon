import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Landing.module.css';

const Landing = () => {
    const history = useHistory();

    const handleIngresar = () => {
        history.push('/home');
    };

    return (
        <div className = { styles['landing'] }>
            <img 
            SRC = { require('../../imagenes/pokemonLanding.jpg').default }
            alt = 'imagen de fondo'
            calssName = { styles['background-image'] } />

            <button className = { styles.buttonLan } onClick = { handleIngresar }>Ingresar</button>
            
        </div>

    );
}

export default Landing;