<template>
  <div>
    <button @click="descargarArchivo">Descargar Archivo</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue';

@Component
export default class TuComponente extends Vue {
  descargarArchivo() {
    const contenidoArchivo = '¡Aquí va el contenido de tu archivo .txt!';
    const nombreArchivo = 'resultado.txt';

    const elementoEnlace = document.createElement('a');
    const archivo = new Blob([contenidoArchivo], { type: 'text/plain' });

    elementoEnlace.href = URL.createObjectURL(archivo);
    elementoEnlace.download = nombreArchivo;
    elementoEnlace.click();
    URL.revokeObjectURL(elementoEnlace.href);
  }
}
</script>