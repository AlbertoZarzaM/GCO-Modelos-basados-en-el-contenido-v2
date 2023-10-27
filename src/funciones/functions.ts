import { fileContentLematizacion } from "./start"



// Tipo de datos tabla
export type Tabla = {
  // cabecera contiene los elementos: índice, palabra, DF, IDF, TF, TF-IDF, similaridad coseno.
  cabecera: string[];
  filas: (string | number)[][];
}


// Tipo de datos para contar las apariciones de cada término en todos los documentos. 
// Necesario para el cálculo de DF.
export type apariciones = {
  termino: string,
  numeroApariciones: number
}




export const lematizar = (elementosLinea: string[]): string[] => {
  const jsonLematizacion = JSON.parse(fileContentLematizacion);
  let arrayLematizado: string[] = [];
  for(let i = 0; i < elementosLinea.length; i++) {
    if (jsonLematizacion[elementosLinea[i]]) {
      arrayLematizado.push(jsonLematizacion[elementosLinea[i]]);
    } else {
      arrayLematizado.push(elementosLinea[i]);
    }
  }
  return arrayLematizado;
}








// Una vez tenemos la tabla
// * 1. Calculamos DF
// * 2. Calculamos TF
// * 3. Calculamos IDF
// * 4. Calculamos TF-IDF (vectores normalizados)
// * 5. Similaridad coseno entre cada par de documentos.


// Recibimos un array de arrays, donde cada array coresponde a las palabras de un documento.
export const gestionCalculos = (palabras: string[][]): void => {
  // llamada a función DF
  console.log("LLamada a DF");

  let arrayApariciones: apariciones[] = DF(palabras);


  // crear tabla a partir de la string, una tabla para cada documento.
  crearTablas(palabras, arrayApariciones);

  // para cada elemento de cada tabla:
    // llamada a función TF
    // llamada a función IDF
    // llamada a función TF-IDF (vectores normalizados)
    // llamada a función Similaridad coseno entre cada par de documentos.
}


export const crearTablas = (palabras: string[][], arrayApariciones: apariciones[]): Tabla[] => {
  let arrayTablas: Tabla[] = [];

  for(let i = 0; i < palabras.length; i++) {
    let tabla: Tabla = {
      cabecera: ["Índice", "Palabra", "DF", "IDF", "TF", "TF-IDF", "Similaridad Coseno"],
      filas: []
    }
    for(let j = 0; j < palabras[i].length; j++) {
      let df: number = obtenerDF(palabras[i][j], arrayApariciones);

      tabla.filas.push([i, palabras[i][j], df, "", "", "", ""]);
    }
    arrayTablas.push(tabla);  
  }
  console.log("TABLAS");
  console.log(arrayTablas);
  return arrayTablas;
}


/**
 * Función que devuelve el DF de una palabra.
 * @param palabra palabra a buscar
 * @param arrayApariciones array con todos los términos y su número de apariciones
 * @returns número de apariciones de la palabra en todos los documentos
 */
const obtenerDF = (palabra: string, arrayApariciones: apariciones[]): number => {
  let df: number = 0;
  for (let i = 0; i < arrayApariciones.length; i++) {
    if (arrayApariciones[i].termino === palabra) {
      df = arrayApariciones[i].numeroApariciones;
    }
  }
  return df;
}

/**
 * Función que calcula todos los DF
 * @param palabras Todas las palabras de todos los documentos
 * @returns array con todos los términos y su número de apariciones
 */
export const DF = (palabras: string[][]): apariciones[] => {

  // array de apariciones
  let arrayApariciones: apariciones[] = [];

  for (let i = 0; i < palabras.length; i++) {
    for (let j = 0; j < palabras[i].length; j++) {
      if (arrayApariciones.find(elemento => elemento.termino === palabras[i][j])) {
        // si existe, sumamos 1 a apariciones
        arrayApariciones.find(elemento => elemento.termino === palabras[i][j])!.numeroApariciones++;

      } else {
        // si no existe, lo añadimos
        arrayApariciones.push({termino: palabras[i][j], numeroApariciones: 1});
      }
    }
  }

  // imprimir todos los términos y su número de apariciones
  console.log(arrayApariciones);
  return arrayApariciones;
}