
# Gestión del conocimiento en las organizaciones

## Práctica 2: Sistemas de recomendación. Modelos basados en el contenido


#### Autores:
- Ismael Martín Herrera (alu0101397375@ull.edu.es)
- Alberto Zarza Martín (alu0101412993@ull.edu.es)
- Marco Antonio Barroso Hormiga (alu0101386560@ull.edu.es)

### Guía de instalación

Para esta práctica hemos utilizado el framework [Vue.js](https://vuejs.org/) junto a TypeScript. Destacar que no es necesario desplegar el proyecto para probarlo, ya que hemos utilizado la herramienta "GitHub Pages" para desplegar nuestra aplicación. Para acceder a ella, simplemente hay que acceder al siguiente enlace: [Enlace a la web](https://albertozarzam.github.io/GCO-Modelos-basados-en-el-contenido-v2/). Nos bastará con subir un fichero de texto plano (.txt), donde cada documento vendrá especificado en una línea, además de un fichero con palabras de parada (stopwords) y un fichero de lematización de términos para poder probar el sistema de recomendación.

En cualquier caso, también existe la posibilidad de clonar el proyecto, instalar las dependecias e inciar el servidor en modo desarrollo siguiendo los siguientes pasos:

1. **Instalar NVM (Node Version Manager)**: 
Este paso lo ejecutaremos en caso de no tener instalado NVM en nuestro sistema.
``` bash
  wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
  exec bash -l
```
2. A continuación, instalaremos la **versión de node** que vamos a utilizar:

``` bash
  nvm install 20.8.0 
```

3. Instalaremos **TypeScript** en caso de no tenerlo instalado previamente en nuestro sistema:

``` bash
  npm install --global typescript
```

4. Instalaremos las dependencias del proyecto:
``` bash
  npm install
```

5. Por último, iniciaremos el servidor en modo desarrollo:
``` bash
  npm run serve
```
Esto nos abrirá una ventana en nuestro navegador por defecto con la aplicación en modo desarrollo, en un puerto concreto.

### Descripción del código

*start.ts*
  - **cargarArchivo**:
  - **procesar**:

*functions.ts*

- ```Typescript
    export const lematizar = (elementosLinea: string[]): string[] => {}
    ``` 

- ```Typescript
    export const gestionCalculos = (palabras: string[][]): Tabla[] => {}
    ``` 

- ```Typescript
    export const gestionCalculos = (palabras: string[][]): Tabla[] => {}
    ``` 
    Función que se encarga de gestionar todos los cálculos y de invocar al resto de funciones.

- ```Typescript
    export const crearTablas = (palabras: string[][], arrayApariciones: apariciones[]): Tabla[] => {}
    ``` 

- ```Typescript
    export const calcularApariciones = (documento: string[], termino: string): number => {}
    ``` 

- ```Typescript
    const obtenerDF = (palabra: string, arrayApariciones: apariciones[]): number => {}
    ``` 

- ```Typescript
    export const DF = (palabras: string[][]): apariciones[] => {}
    ``` 
- ```Typescript
    export const TF = (tablas: Tabla[]): void => {}
    ``` 

- ```Typescript
    export const IDF = (corpus_total: number, tablas: Tabla[]): void => {}
    ``` 

- ```Typescript
    export const longitudTF = (tablas: Tabla[]): void => {}
    ``` 

- ```Typescript
    export const TFIDF = (tablas: Tabla[]): void => {}
    ``` 

- ```Typescript
    export const similaridadCoseno = (tablas: Tabla[]): void => {}
    ``` 

- ```Typescript
    export function matrizATabla(matriz: (string|number)[][]): string {}
    ``` 







Explicar Main
Explicar App.vue

### Ejemplo de uso