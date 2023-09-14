import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import validationForm from './validationForm.js';
import styles from './Form.module.css';

const initialPokemon = {
    name: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    image: '',
    types: [],
};

const Form = () => {
    const types= useSelector((state) => state.pokemons.types); //esto lo sabemos por la api?
    const [create, setCreate] = useState(initialPokemon);
    const [disabled, setDisabled] = useState(true);
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const handleChange = (event) => {
        if (disabled) {
            setDisabled(false);
        }
        setCreate({
            ...create,
            [event.target.name]: event.target.value,
        });
        setErrors(
            validationForm({ ...create, [event.target.name]: event.target.value})
        ); 
    };

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    const getTypeName = (id) => {
        const type = types.find((t) => t.id === id);
        return type ? type.name : '';
    };

    const handleChangePokemons = (event) => {
        const typeName = event.target.value;
        if (create.types.includes(typeName)) {
            setCreate({
                ...create,
                types: create.types.filter((t) => t !== typeName),
            });
            setErrors(
                validationForm({
                    ...create,
                    types: create.types.filter((t) => t !== typeName),
                })
            );
        } else {
            setCreate({
            ...create,
            types: [...create.types,typeName],
        });
        setErrors(
            validationForm({
                ...create,
                types: [...create.types, typeName],
            })
        );
            
      }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!Object.entries(errors).length) {
            const body= {
                name: create.name,
                hp: create.hp,
                attack: create.attack,
                defense: create.defense,
                image: create.image,
                types: create.types,
            };
            const response = await axios.post(`http://localhost:3001/pokemons`, body);
            if (response.data.message) {
                alert(response.data.message);
                history.push(`/pokemons/${response.data.new_pokemon.id}`);
                console.log(response.data.message);
        }
        }
    };

    return (
        <div className={styles.formWrapper}>
            <div className={ styles.formContainer }>
                <h2 className={ styles.formTittle }>Create Pokemon</h2>
                <form onSubmit={ handleSubmit }>
                    <div className={ styles.formField }>
                        <label className={ styles.label }>Name:</label>
                        <input
                        onChange={ handleChange }
                        value={ create.name }
                        name='name'
                        className={ styles.inputField } />
                        {errors.name && <label className={ styles.errorLabel }> { errors.name }</label>}
                    </div>

                    
                    <div className={ styles.formField } >
                        <label className={ styles.label }>Vida:</label>
                        <input 
                        onChange={ handleChange }
                        value={ create.hp }
                        type='number'
                        name='hp'
                        className={ styles.inputField } />

                        { errors.hp && <label className={ styles.errorLabel }>{ errors.hp }</label> }
                    </div>

                    <div className={ styles.formField }>
                        <label className={ styles.label }>Ataque:</label>
                        <input 
                        onChange={ handleChange }
                        value={ create.attack }
                        type='number'
                        name='attack'
                        className={ styles.inputField } />

                        { errors.attack && <label className={ styles.errorLabel }>{ errors.attack }</label>}
                    </div>

                    <div className={ styles.formField } >
                        <label className={ styles.label }>Defensa:</label>
                        <input 
                        onChange={ handleChange }
                        value={ create.defense }
                        type='number'
                        name='defense'
                        className={ styles.inputField } />

                        { errors.defense && <label className={ styles.errorLabel }>{ errors.defense }</label>}
                    </div>

                    <div className={ styles.formField } >
                        <label className={ styles.label }>Velocidad:</label>
                        <input 
                        onChange={ handleChange }
                        value={ create.speed }
                        type='number'
                        name='speed'
                        className={ styles.inputField } />

                        { errors.speed && <label className={ styles.errorLabel }>{ errors.speed }</label>}
                    </div>

                    <div className={ styles.formField } >
                        <label className={ styles.label }>Altura:</label>
                        <input 
                        onChange={ handleChange }
                        value={ create.height }
                        type='number'
                        name='height'
                        className={ styles.inputField } />

                        { errors.height && <label className={ styles.errorLabel }>{ errors.height }</label>}
                    </div>

                    <div className={ styles.formField } >
                        <label className={ styles.label }>Peso:</label>
                        <input 
                        onChange={ handleChange }
                        value={ create.weight }
                        type='number'
                        name='weight'
                        className={ styles.inputField } />

                        { errors.weight && <label className={ styles.errorLabel }>{ errors.weight }</label>}
                    </div>

                    <div className={ styles.formField } >
                        <label className={ styles.label }>Imagen:</label>
                        <input 
                        onChange={ handleChange }
                        value={ create.image }
                        type='file'
                        accept='image/*' //Limita la selección de archivos a aquellos de tipo imagen.
                        name='image'
                        className={ styles.inputField } />

                        { errors.image && <label className={ styles.errorLabel }>{ errors.image }</label>}
                    </div>

                    <div className={ styles.checkboxContainer }>
                        <label className={ styles.label }>Type:</label>
                        { errors.types && (
                            <label className={ styles.errorLabel }>{ errors.types }</label>
                        )}
                        { types?.map((t) => (
                            <div key={ t.id } className={ styles.checkbozLabel }>
                                <input
                                onChange={ handleChangePokemons }
                                value={ `${t.id}` }
                                type='checkbox'
                                className={ styles.checkboxInput } />
                                <span>{getTypeName(t.id)}</span>
                            </div>
                        ))}
                    </div>

                    <div className={ styles.formField }>
                        <button
                        disabled={ disabled || Object.entries(errors).length > 0 }
                        type='submit'
                        className={ styles.submitButton }
                        >Create</button>
                    </div>

                    <div className={ styles.formField }>
                        <Link to={ `/home` }>Home</Link>
                    </div>

                </form>
            </div>
        </div>
    )

}

export default Form;