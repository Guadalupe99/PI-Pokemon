
//PAGINATION
//entiendo lo que hace.. pero me cuesta comprenderlo, es mas comliacada la logica, pero entiendo el funcionamiento

//SEARCHBAR
//me sale una raya en el visual studio code

//toString -> buscar
//includes -> buscar


import style from "./Form.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import validation from "./validations";
import { getTypes, postPokemon } from "../../redux/actions";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Accedemos al estado almacenado en el store de redux y obtenemos los tipos de pokemon disponibles
  const { pokemonsTypes } = useSelector((state) => state);

  useEffect(() => {
    if (pokemonsTypes.length === 0) {
      dispatch(getTypes());
    }
  }, [dispatch]);

  // Inicializamos el estado del formulario con sus respectivas propiedades
  const [form, setForm] = useState({
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

  const [errorMessage, setErrorMessage] = useState({});

  // Función que maneja los cambios en los campos del formulario
  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });

    const errors = validation({ ...form, [property]: value });
    setErrorMessage(errors);
  };

  // Función que maneja la seleccion de tipos de pokemon
  const handleSelect = (event) => {
    const newType = event.target.value;
    if (form.types.includes(newType)) {
      alert("That type is already selected");
      return;
    }

    setForm({ ...form, types: [...form.types, newType] });
    event.target.value = "";
  };

  const handleClearTypes = () => {
    setForm({ ...form, types: [] });
  };

  //Funcion para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.types.length === 0) {
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

      return;
    }

    dispatch(postPokemon(form));
    alert("Pokemon added successfully");

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

    navigate("/home");
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
    <div className={style.body}>
      <div>
        <Link to="/home" className={style.link}>
          <button className={style.boton}>Home</button>
        </Link>
        <form onSubmit={handleSubmit} className={style.form}>
          <div>
            <label htmlFor="name" className={style.label}>
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="name"
              autoComplete="off"
              value={form.name}
              onChange={changeHandler}
              className={style.inputs}
            />{" "}
            {errorMessage.name && (
              <p style={{ color: "red" }}>{errorMessage.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="hp" className={style.label}>
              Health points
            </label>
            <input
              type="number"
              name="hp"
              id="hp"
              placeholder="health points"
              autoComplete="off"
              value={form.hp}
              onChange={changeHandler}
              className={style.inputs}
            />
            {errorMessage.hp && (
              <p style={{ color: "red" }}>{errorMessage.hp}</p>
            )}
          </div>

          <div>
            <label htmlFor="attack" className={style.label}>
              Attack
            </label>
            <input
              type="number"
              name="attack"
              id="attack"
              placeholder="attack"
              autoComplete="off"
              value={form.attack}
              onChange={changeHandler}
              className={style.inputs}
            />
            {errorMessage.attack && (
              <p style={{ color: "red" }}>{errorMessage.attack}</p>
            )}
          </div>

          <div>
            <label htmlFor="defense" className={style.label}>
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
              className={style.inputs}
            />
            {errorMessage.defense && (
              <p style={{ color: "red" }}>{errorMessage.defense}</p>
            )}
          </div>

          <div>
            <label htmlFor="speed" className={style.label}>
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
              className={style.inputs}
            />
            {errorMessage.speed && (
              <p style={{ color: "red" }}>{errorMessage.speed}</p>
            )}
          </div>

          <div>
            <label htmlFor="height" className={style.label}>
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
              className={style.inputs}
            />
            {errorMessage.height && (
              <p style={{ color: "red" }}>{errorMessage.height}</p>
            )}
          </div>

          <div>
            <label htmlFor="weight" className={style.label}>
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
              className={style.inputs}
            />
            {errorMessage.weight && (
              <p style={{ color: "red" }}>{errorMessage.weight}</p>
            )}
          </div>

          <div>
            <label className={style.label}> Types </label>
            <select onChange={handleSelect} className={style.select}>
              <option value={form.types} className={style.option}>
                {" "}
                Select types
              </option>
              {pokemonsTypes?.map((type) => {
                return (
                  <option key={type.id} name={type.id} value={type.id}>
                    {type.name}
                  </option>
                );
              })}
            </select>
            <button onClick={handleClearTypes} className={style.create}>
              Clear Types
            </button>
            {errorMessage.types && (
              <p style={{ color: "red" }}>{errorMessage.types}</p>
            )}
            <ul>
              {pokemonsTypes?.map((type) => {
                if (form.types.includes(type.id.toString())) {
                  return <li key={type.id}>{type.name}</li>;
                }
              })}
            </ul>
          </div>
          <div>
            <label htmlFor="image" className={style.label}>
              Image
            </label>
            <input
              type="text"
              name="image"
              id="image"
              placeholder="url of the image"
              size="20"
              autoComplete="off"
              value={form.image}
              onChange={changeHandler}
              className={style.inputs}
            />
            {errorMessage.image && (
              <p style={{ color: "red" }}>{errorMessage.image}</p>
            )}
          </div>
          <div></div>

          <button
            type="submit"
            className={style.create}
            disabled={!disableSubmit()}
          >
            Create Pokemon
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;











const validation = (form) => {
  let errors = {};

  //name
  if (!form.name) errors.name = "please complete this field";
  if (form.name.length > 12) errors.name = "must be less than 12 characters";
  if (!/^[a-zA-Z ]*$/.test(form.name)) errors.name = "only letters are allowed";

  //image
  if (!form.image) errors.image = "please complete this field";
  if (!/\.(jpg|png)$/i.test(form.image))
    errors.image = "the URL must end in .jpg or .png";

  // types
  if (form.types.length === 0)
    errors.types = "you must select at least one type";
  if (form.types.length > 2) errors.types = "You can select up to 2 types";

  //hp
  if (!form.hp) errors.hp = "please complete this field";
  if (form.hp > 100 || form.hp < 1)
    errors.hp = "cannot be greater than 100 or better than 1";
  if (!/^[0-9]*$/.test(form.hp)) errors.hp = "only numbers are allowed";

  //attack
  if (!form.attack) errors.attack = "please complete this field";
  if (form.attack > 100 || form.attack < 1)
    errors.attack = "cannot be greater than 100 or better than 1";
  if (!/^[0-9]*$/.test(form.attack)) errors.attack = "only numbers are allowed";

  //defense
  if (!form.defense) errors.defense = "please complete this field";
  if (form.defense > 100 || form.defense < 1)
    errors.defense = "cannot be greater than 100 or better than 1";
  if (!/^[0-9]*$/.test(form.defense))
    errors.defense = "only numbers are allowed";

  //speed
  if (!form.speed) errors.speed = "please complete this field";
  if (form.speed > 100 || form.speed < 1)
    errors.speed = "cannot be greater than 100 or better than 1";
  if (!/^[0-9]*$/.test(form.speed)) errors.speed = "only numbers are allowed";

  //height
  if (!form.height) errors.height = "please complete this field";
  if (form.height > 100 || form.height < 1)
    errors.height = "cannot be greater than 100 or better than 1";
  if (!/^[0-9]*$/.test(form.height)) errors.height = "only numbers are allowed";

  //weight
  if (!form.weight) errors.weight = "please complete this field";
  if (form.weight > 100 || form.weight < 1)
    errors.weight = "cannot be greater than 100 or better than 1";
  if (!/^[0-9]*$/.test(form.weight)) errors.weight = "only numbers are allowed";

  return errors;
};

export default validation;