import React from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.css';

const Card = (props) => {
    return (
        <Link to={`/detail/${props.id}`} className={ style.card }>
           <div className={ style.card }>
            <div className={ style.textBoxName }>
                <h1 className={ style.name }>{props.name}</h1>
            </div>
            <img src={ props.image } alt={ props.name } className={ style.image }/>
            <div className={ style.textBoxType }>
                <p className={ style.type }>{props.types}</p>
            </div>
           </div> 
        </Link>
    );
};

export default Card;
