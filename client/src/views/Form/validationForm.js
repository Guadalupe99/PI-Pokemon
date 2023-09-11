const validationForm = (create) => {
    let errors = {};

    //validacion del nombre
    if (!create.name.trim()) {
        errors.name = 'se requiere Nombre';
    } else if (!/^[a-zA-Z\s]+$/.test(create.name)) {
        errors.name = "Name can only contain letters and spaces";
    }

     // Validación de la vida 
     if (!create.vida.trim()) {
        errors.vida = "vida is required";
      } else if (!/^\d+$/.test(create.vida)) {
        errors.vida = "vida must be a number";
      }

       // Validación del ataque
    if (!create.ataque.trim()) {
        errors.ataque = "ataque is required";
      } else if (!/^\d+$/.test(create.ataque)) {
        errors.ataque = "ataque must be a number";
      }

       // Validación de la defensa
    if (!create.defensa.trim()) {
        errors.defensa = "defensa is required";
      } else if (!/^\d+$/.test(create.defensa)) {
        errors.defensa = "defensa must be a number";
      }

       // Validación de la imagen
    if (!create.image) {
       errors.image = "Image is required";
    }  else if (!isValidImageUrl(create.image)) {
       errors.image = "Invalid image URL";
    }

        //Función para validar una URL
    function isValidImageUrl(url) { //PORQUE SALE ASI EN NOMNBRE DE LA FUNCION -----------------?
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
    }

    return errors;

}

// !/^[a-zA-Z\s]+$/ => Se utiliza para verificar si una cadena NO consiste únicamente en letras alfabéticas (mayúsculas o minúsculas)
// y espacios en blanco. El símbolo de exclamación (!) al principio invierte la lógica de coincidencia de la expresión regular.
//  En este caso, se busca cualquier cadena que no cumpla con el patrón de contener solo letras alfabéticas y espacios.


// !/^\d+$/ => Se utiliza en el contexto de las validaciones para verificar si una cadena NO consiste únicamente en dígitos
//numéricos. El símbolo de exclamación (!) al principio invierte la lógica de coincidencia de la expresión 
//regular. En este caso, se busca cualquier cadena que no cumpla con el patrón de tener solo dígitos numéricos.

//  /^(ftp|http|https):\/\/[^ "]+$/ => Expresión regular para verificar una URL de imagen básica