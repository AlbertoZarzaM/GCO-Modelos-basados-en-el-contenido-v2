import {lematizar, DF, gestionCalculos, matrizATabla, type Tabla} from "./functions"


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
  
  let matrices: (string | number)[][][] = [];

  for(let i = 0; i < mi_tabla.length; i++) {
    matrices.push(mi_tabla[i].filas);
  }
  
  let miCabecera: string[] = mi_tabla[0].cabecera;

  
  
  // Obtén el elemento div en el que deseas mostrar la matriz
  const divElement = document.getElementById("miDiv");
  
  if (divElement) {
    // Convierte la matriz en una tabla HTML
    
    
    const cabeceraHTML = matrizATabla([miCabecera]);
    
    for(let i = 0; i < matrices.length; i++) {
      let similaridadCoseno: string[] = [];
      divElement.innerHTML += "<p class=\"texto-custom\"> Tabla del documento " + i.toString() + "</p>";
      divElement.innerHTML += cabeceraHTML;
      const tablaHTML = matrizATabla(matrices[i]);
      // Agrega la tabla HTML al contenido del div
      divElement.innerHTML += tablaHTML;
      divElement.innerHTML += "<br>";
      if (mi_tabla[i].similaridadCoseno !== undefined) {
        for(let k = 0; k < mi_tabla[i].similaridadCoseno.length; k++) {
          let auxString: string = "<p class=\"texto-custom\"> Similaridad Coseno del documento " + i.toString() + " con el documento " + mi_tabla[i].similaridadCoseno[k].otroDocumento.toString() + ": " + mi_tabla[i].similaridadCoseno[k].similaridad.toString()+"</p>";
          similaridadCoseno.push(auxString);
        }
        for (let j = 0; j < similaridadCoseno.length; j++) {
          divElement.innerHTML += similaridadCoseno[j];
          divElement.innerHTML += "<br>";
        }
      } else {
        divElement.innerHTML += "<br>";
      }

    }
  }

}



