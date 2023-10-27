import { fileContentLematizacion } from "./start"



// Tipo de datos tabla
export type Tabla = {
  // cabecera contiene los elementos: índice, palabra, DF, IDF, TF, TF-IDF, similaridad coseno.
  //const cabecera: string[] = ["Índice", "Palabra", "DF", "IDF", "TF", "TF-IDF", "Similaridad Coseno"];
 // const filas: string[][] = [];
}

export type apariciones = {
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
  // crear tabla a partir de la string, una tabla para cada documento.
  crearTablas(palabras);
  // llamada a función DF

  // para cada elemento de cada tabla:
    // llamada a función TF
    // llamada a función IDF
    // llamada a función TF-IDF (vectores normalizados)
    // llamada a función Similaridad coseno entre cada par de documentos.
}


export const crearTablas = (palabras: string[][]): void => {

}

export const DF = (): void => {
  // para todos los términos, buscar el número de apariciones en todos los documentos.
  // se le pasa el array de arrays de palabras
  // hacemos búsqueda y vamos almacenando
}