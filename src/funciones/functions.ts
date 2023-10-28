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
  longitud_TF: number;
  similaridadCoseno: similaridadType [];
}


// Tipo de datos para contar las apariciones de cada término en todos los documentos. 
// Necesario para el cálculo de DF.
export type apariciones = {
  termino: string,
  numeroApariciones: number
}

// Tipo de datos para la similaridad coseno
export type similaridadType = {
  similaridad: number
  otroDocumento: number
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
export const gestionCalculos = (palabras: string[][]): Tabla[] => {
  // Array de apariciones de cada término en todos los documentos.
  let arrayApariciones: apariciones[] = DF(palabras);

  // crear tabla a partir de la string, una tabla para cada documento.
  let tablas: Tabla[] = crearTablas(palabras, arrayApariciones);

  // llamada a función TF
  TF(tablas);
  longitudTF(tablas);

  // llamada a función IDF
  IDF(palabras.length, tablas);
  
  // llamada a función TF-IDF (vectores normalizados)
  TFIDF(tablas);

  // llamada a función Similaridad coseno entre cada par de documentos.
  similaridadCoseno(tablas);

  return tablas;

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
      cabecera: ["Índice", "Palabra", "Nº Apariciones en el documento", "DF", "IDF", "TF", "TF-IDF"],
      filas: [],
      longitud_TF: 0,
      similaridadCoseno: []
    }
    for(let j = 0; j < palabras[i].length; j++) {
      // si el término no está ya en la tabla, lo añadimos
      if (!tabla.filas.find(elemento => elemento[1] === palabras[i][j])) {
        let df: number = obtenerDF(palabras[i][j], arrayApariciones);
        tabla.filas.push([j, palabras[i][j], calcularApariciones(palabras[i], palabras[i][j]), df, "", "", ""]);
      }
    }
    arrayTablas.push(tabla);  
  }
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
//! ¿Calculo longitud del vector?


/**
 * Función que calcula la longitud del vector normalizado de cada documento.
 * @param tablas todos los documentos con sus términos.
 */
export const longitudTF = (tablas: Tabla[]): void => {
  // calculamos la longitud del TF para cada documento
  // raiz(suma de cada del documento tf^2)
  for (let i = 0; i < tablas.length; i++) {
    let suma: number = 0;
    for (let j = 0; j < tablas[i].filas.length; j++) {
      suma += Math.pow(tablas[i].filas[j][5] as number, 2);
    }
    tablas[i].longitud_TF = Math.sqrt(suma);
  }
}

/**
 * Función que calcula el TF-IDF de cada término en cada documento.
 * @param tablas todos los documentos con sus términos.
 */
export const TFIDF = (tablas: Tabla[]): void => {
  // vectores normalizados
  // TF/longitud del vector
  for (let i = 0; i < tablas.length; i++) {
    let longitudVectorNormalizado: number = 0;
    for (let j = 0; j < tablas[i].filas.length; j++) {
      tablas[i].filas[j][6] = (tablas[i].filas[j][5] as number) / tablas[i].longitud_TF;
      longitudVectorNormalizado += Math.pow(tablas[i].filas[j][6] as number, 2);
    }
    let resultado: number = Math.sqrt(longitudVectorNormalizado);
    // console.log('Longitud vector normalizado: ',resultado);
  }
}

export const similaridadCoseno = (tablas: Tabla[]): void => {
  for(let i = 0; i < tablas.length; ++i) {
    for(let j = i; j < tablas.length; ++j) {  // empezamos en i ya que actualizamos ambas tablas de una vez.
      if(i !== j) {                           // Comparación de documentos distintos
        let sumaSimilaridad: number = 0;

        // Recorremos ambos documentos y comparamos los términos que tengan en común.
        // el orden de los términos no es el mismo en ambos documentos, por lo que no podemos compararlos directamente.
        for(let k = 0; k < tablas[i].filas.length; ++k) {
          for(let l = 0; l < tablas[j].filas.length; ++l) {
            if(tablas[i].filas[k][1] === tablas[j].filas[l][1]) {
              sumaSimilaridad += (tablas[i].filas[k][6] as number) * (tablas[j].filas[l][6] as number);
            }
          }
        }

        console.log("Suma similaridad entre doc ", i , " y doc ", j, ": ", sumaSimilaridad);

        tablas[i].similaridadCoseno?.push({similaridad: sumaSimilaridad, otroDocumento: j});
        tablas[j].similaridadCoseno?.push({similaridad: sumaSimilaridad, otroDocumento: i});
      }
    }
  }
}


export function matrizATabla(matriz: (string|number)[][]): string {
  let tablaHTML = "<table class=\"custom-table\">";
  for (let i = 0; i < matriz.length; i++) {
    tablaHTML += "<tr>";
    for (let j = 0; j < matriz[i].length; j++) {
      tablaHTML += "<td >" + matriz[i][j] + "</td>";
    }
    tablaHTML += "</tr>";
  }
  tablaHTML += "</table>";
  return tablaHTML;
}
