import {lematizar, DF, gestionCalculos, matrizATabla, type Tabla} from "./functions"


let numeroArchivo: number = 0;
let fileContent1: string = "";
let fileContent2: string = "";

let documentFileName: string = "";

let resultado: string = "";

export let fileContentLematizacion: string = "";

export const cargarArchivo = (numeroArchivo: number): void => {

  const fileInput = document.getElementById(`fileInput${numeroArchivo}`) as HTMLInputElement;
  
  if (fileInput) {
    const file = fileInput.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        // Guarda el contenido del archivo en una variable correspondiente
        if (numeroArchivo === 1) {
          fileContent1 = e.target?.result as string;
          documentFileName = file.name; // Guardamos el nombre del archivo en una variable global para luego descagar un fichero con ese nombre
        } else if (numeroArchivo === 2) {
          fileContent2 = e.target?.result as string;
        } else if (numeroArchivo === 3) {
          fileContentLematizacion = e.target?.result as string;
        }
      };
      reader.readAsText(file);
    }
  }
};



export const procesar = (): void  => {
  console.log("Procesando...");
  //separar cada linea en un array 
  let arrayFilas: string[] = fileContent1.split("\n");

  //Eliminar espacios, puntos, comas, palabras vacias, saltos de línea y separar en array cada linea

  let arrayPalabras: string[][] = [];
  console.log('Eliminando espacios, puntos, comas, palabras vacias, saltos de línea y separando en array cada linea...')
  for (let i = 0; i < arrayFilas.length; i++) {
    arrayFilas[i] = arrayFilas[i].replace(/\s+/g, " ");
    arrayFilas[i] = arrayFilas[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    arrayFilas[i] = arrayFilas[i].replace(/\r?\n|\r/g, "");
    arrayFilas[i] = arrayFilas[i].toLowerCase();
    arrayPalabras[i] = arrayFilas[i].split(" ");
  }
  
   //lematizar cada file
  console.log('Lematizando...');
  for(let i = 0; i < arrayPalabras.length; i++) {
    arrayPalabras[i] = lematizar(arrayPalabras[i]);
  }

  // eliminar stop words de cada linea
  console.log('Eliminando stop words...');
  let stopWords: string[] = fileContent2.split("\r\n");

  arrayPalabras = arrayPalabras.map((linea) => {  
    return linea.filter((palabra) => {
      return !stopWords.includes(palabra);
    });
  }
  );

  console.log(arrayPalabras);
  console.log("CALCULOS");  

  
  let mi_tabla: Tabla[] = gestionCalculos(arrayPalabras);


  console.log('Creando documento...');
  escribirYDescargar(mi_tabla);

}


export const escribirYDescargar = (miTabla: Tabla[]) => {
  let contenido: string = '';

  // bucle (recorrer tablas)
  // Introducir cabecera de la tabla
  // Introducir filas de la tabla
  // Introducir similaridades de la tabla
  let cabeceraCompleta: string = matrizATabla([["Índice", " Palabra", "Nº Apariciones", "DF", "IDF", "         TF     ", "                  TF-IDF"]])

  // Tu lógica para escribir de forma incremental
  for(let i = 0; i < miTabla.length; i++) {
    console.log("Escribiendo tabla del documento " + i.toString());
    let similaridadCoseno: string[] = [];
    const tablaHTML = matrizATabla(miTabla[i].filas);
    contenido += cabeceraCompleta;
    contenido += matrizATabla(miTabla[i].filas);
    if (miTabla[i].similaridadCoseno !== undefined) {
      for(let k = 0; k < miTabla[i].similaridadCoseno.length; k++) {
        let auxString: string = "Similaridad Coseno del documento " + i.toString() + " con el documento " + miTabla[i].similaridadCoseno[k].otroDocumento.toString() + ": " + miTabla[i].similaridadCoseno[k].similaridad.toString();
        similaridadCoseno.push(auxString);
      }
      for (let j = 0; j < similaridadCoseno.length; j++) {
        contenido += similaridadCoseno[j];
        contenido += "\n";
      }
    } 
  }
  

  // Crear un Blob con el contenido
  const blob = new Blob([contenido], { type: 'text/plain' });

  // Crear un objeto URL
  const url = window.URL.createObjectURL(blob);

  // Crear un enlace y descargar el archivo
  const link = document.createElement('a');
  link.href = url;
  link.download = 'resultado_' + documentFileName; // Nombre del archivo
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Revocar el objeto URL
  window.URL.revokeObjectURL(url);
};


