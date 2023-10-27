import { fileContentLematizacion } from "./start"



// Tipo de datos tabla
export type Tabla = {
  // cabecera contiene los elementos: índice, palabra, DF, IDF, TF, TF-IDF, similaridad coseno.
  //const cabecera: string[] = ["Índice", "Palabra", "DF", "IDF", "TF", "TF-IDF", "Similaridad Coseno"];
 // const filas: string[][] = [];
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

export const DF = (palabras: string[][]): void => {
  // para todos los términos, buscar el número de apariciones en todos los documentos.
  // se le pasa el array de arrays de palabras
  // hacemos búsqueda y vamos almacenando

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

}