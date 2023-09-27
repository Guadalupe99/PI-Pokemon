import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getTypes, postPokemon } from '../../redux/Actions/actions';
import validation from './validationForm.js';
import styles from './Form.module.css';

const Form = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    //Accedemos al estado almacenado en el store de redux y obtenemos los tipos de pokemon disponibles
    const { pokemonsTypes } = useSelector((state) => state);

    useEffect(() => {
        if (pokemonsTypes.length === 0) {
            dispatch(getTypes());
        }
    }, [dispatch]);

    //Inicializamos el estado del formulario con sus respecticas propiedades
    const [form, setForm] = useState({
        name: '',
        image: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: [],

    });

    const [errorMessage, setErrorMessage] = useState({});

    //Funcion que maneja los cambios en los campos del formulario

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setForm({ ...form, [property]: value });

        const errors = validation({ ...form, [property]: value });
        setErrorMessage(errors);
    };

    const handleSelect = (event) => {
        const newType = event.target.value;
        if (form.types.includes(newType)) {
            alert('that type is already selected');
            return;
        }

        setForm({ ...form, types: [...form.types, newType] });
        event.target.value = '';
    };

    const handleClearTypes = () => {
        setForm({ ...form, types: []});
    };

    //Funcion para manejar el envio del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (form.types.length === 0) {
            setForm({
                name: '',
                image: '',
                hp: '',
                attack: '',
                defense: '',
                speed: '',
                height: '',
                weight: '',
                types: [],
            });

            return;
        }

        dispatch(postPokemon(form));
        alert('Pokemon added successfully');

        setForm({
            name: "",
            image: "",
            hp: "",
            attack: "",
            defense: "",
            speed: "",
            height: "",
            weight: "",
            types: [],
        });

        history('/home');
    };

    const disableSubmit = () => {
        if (
            !form.name ||
            !form.height ||
            !form.weight ||
            !form.hp ||
            form.types.length === 0 ||
            !form.image
        )

        return false;
        if (
            errorMessage.name ||
            errorMessage.height ||
            errorMessage.weight ||
            errorMessage.hp ||
            errorMessage.types ||
            errorMessage.image
        )
        
        return false;
        return true;
    };

    return (
        <div className={ styles.body }>
            <div>
                <Link to='/home' className={ styles.link }>
                    <button className={ styles.boton }>Home</button>
                </Link>
                <form onSubmit={ handleSubmit } className={styles.form }>
                    <div>
                        <label htmlFor='name' className={ styles.label }>Name</label>
                        <input
                        type='text'
                        name='name'
                        id='name'
                        placeholder='name'
                        autoComplete='off'
                        value={ form.name }
                        onChange={ changeHandler }
                        className={ styles.inputs } />{' '}
                        {errorMessage.name && (
                            <p style={{ color: 'red' }}>{errorMessage.name}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor='hp' className={ styles.label }>Health points</label>
                        <input
                        type="number"
                        name="hp"
                        id="hp"
                        placeholder="health points"
                        autoComplete="off"
                        value={form.hp}
                        onChange={changeHandler}
                        className={styles.inputs} />
                        {errorMessage.hp && (
                            <p style={{ color:'red' }}>{errorMessage.hp}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor='attack' className={ styles.label}>Attack</label>
                        <input
                        type="number"
                        name="attack"
                        id="attack"
                        placeholder="attack"
                        autoComplete="off"
                        value={form.attack}
                        onChange={changeHandler}
                        className={styles.inputs} />
                        {errorMessage.attack && (
                            <p styles={{ color:'red' }}>{errorMessage.attack}</p>
                        )}
                    </div>

                    
          <div>
            <label htmlFor="defense" className={styles.label}>
              Defense
            </label>
            <input
              type="number"
              name="defense"
              id="defense"
              placeholder="defense"
              autoComplete="off"
              value={form.defense}
              onChange={changeHandler}
              className={styles.inputs}
            />
            {errorMessage.defense && (
              <p style={{ color: "red" }}>{errorMessage.defense}</p>
            )}
          </div>

          <div>
            <label htmlFor="speed" className={styles.label}>
              Speed
            </label>
            <input
              type="number"
              name="speed"
              id="speed"
              placeholder="speed"
              autoComplete="off"
              value={form.speed}
              onChange={changeHandler}
              className={styles.inputs}
            />
            {errorMessage.speed && (
              <p style={{ color: "red" }}>{errorMessage.speed}</p>
            )}
          </div>

          <div>
            <label htmlFor="height" className={styles.label}>
              Height
            </label>
            <input
              type="number"
              name="height"
              id="height"
              placeholder="height"
              autoComplete="off"
              value={form.height}
              onChange={changeHandler}
              className={styles.inputs}
            />
            {errorMessage.height && (
              <p style={{ color: "red" }}>{errorMessage.height}</p>
            )}
          </div>

          <div>
            <label htmlFor="weight" className={styles.label}>
              Weight
            </label>
            <input
              type="number"
              name="weight"
              id="weight"
              placeholder="weight"
              autoComplete="off"
              value={form.weight}
              onChange={changeHandler}
              className={styles.inputs}
            />
            {errorMessage.weight && (
              <p style={{ color: "red" }}>{errorMessage.weight}</p>
            )}
          </div>

          <div>
            <label className={ styles.label }>Types</label>
            <select onChange={ handleSelect } className={ styles.select }>
                <option value={ form.types } className={ styles.option }>{' '} Select types</option>
                {pokemonsTypes?.map((type) => {
                    return (
                        <option key= {type.id } name={ type.id } value={ type.id }>
                            {type.name}
                        </option>
                    );
                })}
            </select>
            <button onClick={ handleClearTypes } className={ styles.create }>Clear Types</button>
            {errorMessage.types && (
                <p style={{ color:'red' }}>{errorMessage.types}</p>
            )}
            <ul>
                {pokemonsTypes?.map((type) => {
                    if (form.types.includes(type.id.toString())) {
                        return <li key={type.id}>{type.name}</li>
                    }
                })}
            </ul>
          </div>
          <div>
           <label htmlFor='image' clasName= {styles.label }>Image</label>
           <input
           type="text"
           name="image"
           id="image"
           placeholder="url of the image"
           size="20"
           autoComplete="off"
           value={form.image}
           onChange={changeHandler}
           className={styles.inputs} />
           {errorMessage.image && (
            <p style={{ color: 'red' }}>{errorMessage.image}</p>
           )}
           </div>
           <div></div>

           <button
            type="submit"
            className={styles.create}
            disabled={!disableSubmit()}>Create Pokemon</button>
                </form>
            </div>

        </div>
    );
};

export default Form;

















