import {lematizar, DF, gestionCalculos} from "./functions"


let numeroArchivo: number = 0;
let fileContent1: string = "";
let fileContent2: string = "";
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

  for (let i = 0; i < arrayFilas.length; i++) {
    arrayFilas[i] = arrayFilas[i].replace(/\s+/g, " ");
    arrayFilas[i] = arrayFilas[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    arrayFilas[i] = arrayFilas[i].replace(/\r?\n|\r/g, "");
    arrayFilas[i] = arrayFilas[i].toLowerCase();
    arrayPalabras[i] = arrayFilas[i].split(" ");
  }
  
   //lematizar cada file
  for(let i = 0; i < arrayPalabras.length; i++) {
    arrayPalabras[i] = lematizar(arrayPalabras[i]);
  }

  // eliminar stop words de cada linea
  let stopWords: string[] = fileContent2.split("\n");

  for (let i = 0; i < arrayPalabras.length; i++) {
    for (let j = 0; j < arrayPalabras[i].length; j++) {
      for (let k = 0; k < stopWords.length; k++) {
        if (arrayPalabras[i][j] === stopWords[k]) {
          arrayPalabras[i].splice(j, 1);
        }
      }
    }
  }

  console.log(arrayPalabras);
  console.log("CALCULOS");  

  gestionCalculos(arrayPalabras);



};