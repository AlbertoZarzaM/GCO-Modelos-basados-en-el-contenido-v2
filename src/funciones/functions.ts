import { fileContentLematizacion } from "./start"



// Tipo de datos tabla
export type Tabla = {
  /*
  cabecera contiene los elementos: 
  [0] índice
  [1] palabra
  [2] nº apariciones en el documento
  [3] DF
  [4] IDF
  [5] TF
  [6] TF-IDF
  [7] Similaridad Coseno
  */ 
  
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
  console.log("LLamada a DF")
  // Array de apariciones de cada término en todos los documentos.
  let arrayApariciones: apariciones[] = DF(palabras);

  // crear tabla a partir de la string, una tabla para cada documento.
  let tablas: Tabla[] = crearTablas(palabras, arrayApariciones);

  // para cada elemento de cada tabla --> los bucles los hago dentro, a todas las funciones les paso las tablas.
    // llamada a función TF
    TF(tablas);

    // llamada a función IDF
    IDF(palabras.length, tablas);
    console.log("IDF calculado")
    console.log(tablas);

    // llamada a función TF-IDF (vectores normalizados)
    // llamada a función Similaridad coseno entre cada par de documentos.
}

/**
 * Función que crea las tablas
 * @param palabras Todas las palabras de todos los documentos
 * @param arrayApariciones Apariciones totales de cada término en todos los documentos
 * @returns array con las tablas creadas
 */
export const crearTablas = (palabras: string[][], arrayApariciones: apariciones[]): Tabla[] => {
  let arrayTablas: Tabla[] = [];

  for(let i = 0; i < palabras.length; i++) {
    let tabla: Tabla = {
      cabecera: ["Índice", "Palabra", "Nº Apariciones en el documento", "DF", "IDF", "TF", "TF-IDF", "Similaridad Coseno"],
      filas: []
    }
    for(let j = 0; j < palabras[i].length; j++) {
      let df: number = obtenerDF(palabras[i][j], arrayApariciones);

      tabla.filas.push([i, palabras[i][j], calcularApariciones(palabras[i], palabras[i][j]), df, "", "", "", ""]);
    }
    arrayTablas.push(tabla);  
  }
  // console.log("TABLAS");
  // console.log(arrayTablas);
  return arrayTablas;
}

/**
 * Función que calcula el número de apariciones de un término en un documento.
 * @param documento array de palabras de un documento
 * @param termino término a buscar
 * @returns número de apariciones del término en el documento
 */
export const calcularApariciones = (documento: string[], termino: string): number => {
  let numeroAparicionesDoc: number = 0;
  for(let i = 0; i < documento.length; i++) {
    if (documento[i] === termino) {
      numeroAparicionesDoc++;
    }
  }
  return numeroAparicionesDoc;
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



/**
 * Función que calcula el TF de cada término en cada documento.
 * @param tablas Tablas con los datos de cada documento
 */
export const TF = (tablas: Tabla[]): void => {
  // TF = 1 + log10(nº apariciones en el documento)

  // cada fila de tablas tiene un documento.
  for (let i = 0; i < tablas.length; i++) {
    for (let j = 0; j < tablas[i].filas.length; j++) {
      tablas[i].filas[j][5] = 1 + Math.log10(tablas[i].filas[j][2] as number);
    }
  }
}


/**
 * Función que calcula el IDF de cada término en cada documento.
 * @param corpus_total corpus de documentos.
 * @param tablas todos los documentos con sus términos.
 */
export const IDF = (corpus_total: number, tablas: Tabla[]): void => {
// log10(corpus_total / DF) 

  for (let i = 0; i < tablas.length; i++) {
    for (let j = 0; j < tablas[i].filas.length; j++) {
      tablas[i].filas[j][4] = Math.log10(corpus_total / (tablas[i].filas[j][3] as number));
    }
  }
}