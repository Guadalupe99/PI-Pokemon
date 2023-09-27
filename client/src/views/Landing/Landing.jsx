import { Link } from 'react-router-dom';
import styles from './Landing.module.css';


const Landing = () => {
    return (
        <div className= { styles.body }>
            <img
            src='https://www.pngall.com/wp-content/uploads/13/Pokemon-Logo-Background-PNG.png'
            className={ styles.logo }
            alt='img'/>

            <img
            src='https://imagenpng.com/wp-content/uploads/2016/09/Pokebola-pokeball-png-1.png'
            className={ styles.imagen }
            alt='img'/>

            <button className={ styles.boton }>
              <Link to='/home' className={ styles.link }>Start</Link>
            </button>
        </div>
    );
};

export default Landing;