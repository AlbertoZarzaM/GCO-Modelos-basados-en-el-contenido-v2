let numeroArchivo: number = 0;
let fileContent1: string = "";
let fileContent2: string = "";
let fileContent3: string = "";

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
          fileContent3 = e.target?.result as string;
        }
      };
      reader.readAsText(file);
    }
  }
};
export const procesar = (): void  => {
  console.log("Procesando...");
  //Eliminar espacios, puntos, comas, palabras vacias, saltos de línea y separar en array

  let arrayPalabras: string[] = fileContent1.replace(/\s+/g, " ").replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\n/g, " ").split(" ");

  //Eliminar stopwords

  for (let i = 0; i < arrayPalabras.length; i++) {
    if (fileContent2.includes(arrayPalabras[i])) {
      arrayPalabras.splice(i, 1);
      i--;
    }
  }

  //Lematizar

  // for (let i = 0; i < arrayPalabras.length; i++) {
  //   if (fileContent3.includes(arrayPalabras[i])) {
  //     arrayPalabras[i] = fileContent3.split("\n")[fileContent3.split("\n").indexOf(arrayPalabras[i]) + 1];
  //   }
  // }

  

  console.log(arrayPalabras);




};