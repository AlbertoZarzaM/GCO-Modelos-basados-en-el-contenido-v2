<template>


  <br>
  <h1 style="margin-left: 5em;">   Bienvenido!</h1>
  <br>
  <br>


  <div class="container text-center">
    <div class="row align-items-center">
      <div class="col-sm">
        <h2>Documento a analizar</h2>
        <input type="file" id="fileInput1" @change="cargarArchivo(1)"/>
      </div>
      <div class="col-sm">
        <h2>Fichero Stopwords</h2>
          <input type="file" id="fileInput2" @change="cargarArchivo(2)"/>
      </div>
      <div class="col-sm">
          <h2>Fichero lematización</h2>
          <input type="file" id="fileInput3" @change="cargarArchivo(3)"/>
      </div>
  </div>
  </div>
  <br>
  <div class="container text-center" >
    <button type="button" class="btn btn-warning" @click= "procesar()">Procesar</button>
    <div id="result"></div>
  </div>

<div id="miDiv">
  
  
</div>
</template>

<script setup lang="ts">
  import {cargarArchivo, procesar} from '../funciones/start'

</script>



  
<style>

.texto-custom{
  font-weight: bold;
  font-size: 1em;
  margin-left: 5em;
  padding: 0.2px;
}
.custom-table {
    width: 90%;
    table-layout: fixed;
    margin-left: 5em;
    margin-right: 5em;
    margin-top: 2em;
    text-align: center;
  }
  .custom-table th,
  .custom-table td {
    border: 1px solid #000;
    padding: 5px;
  }


template {
  position: relative;
}

  input{
    padding: 2em;
  }



  .custom-link {
    color: #FCA311;
    font-weight: bold; 
    font-size: 1em;
    text-decoration: underline;
  }

  .custom-link:hover {
    color: #E5E5E5;
  }

  .custom-link:focus {
    color: #E5E5E5;
  }


  .nav-link-custom2 {
    color: #ffffff; 
    font-size: 1.25em;
    padding: 0.5em;
  }


  .nav-link-custom2:hover {
    color: #FCA311;
  }

  .nav-link-custom2:focus {
    color: #FCA311;
  }

  /* Botón de la barra de búsqueda*/
  .custom-button {
    background-color: #FCA311;
    color: #000000;
  }  
  .custom-button:hover {
    background-color: #E5E5E5;
    color: #000000;
  }
  .custom-button:focus {
    background-color: #E5E5E5;
    color: #000000;
    outline: none;
    border-color: #FCA311;
    box-shadow: 0 0 0 0.2rem #FCA311;
  }


  /* Botón de enviar del formulario */
  .custom-button2 {
    background-color: #FCA311;
    color: #000000;
  }
  .custom-button2:hover {
    background-color: #14213D;
    color: #FFFFFF;
  }
  .custom-button2:focus {
    background-color: #14213D;
    color: #FFFFFF;
    outline: none;
    border-color: #FCA311;
    box-shadow: 0 0 0 0.2rem #FCA311;
  }

  /* flechas del carousel --> foco del teclado */
  .carousel-control-prev:focus,
  .carousel-control-next:focus {
    outline: solid 0.15em #FCA311; /* Puedes ajustar el color y el grosor del contorno según tus preferencias */
  }

  /* Foco de la tabla */
  .custom-table:focus {
    outline: none;
  }

  /* foco para el cuadro de búsqueda de la cabecera */
  .custom-input:focus {
    outline: none;
    border-color: #FCA311;
    box-shadow: 0 0 0 0.2rem #FCA311;
  }

  /* texto cartas */
  .card .card-body:focus {
    box-shadow: 0 0 0 4px #FCA311;
  }   

  /* texto mas info */
  .accordion-button:focus {
    box-shadow: 0 0 0 4px #FCA311;
    background-color: #E5E5E5;
    color: #000000;
  }
  .accordion-body:focus {
    box-shadow: 0 0 0 4px #FCA311;
    background-color: #E5E5E5;
    color: #000000;
  }


  .mapa-web-text {
    color:black;
    text-decoration: underline;

  } 
  .mapa-web-text:focus {
    color: #5f0dac;
  } 
  .mapa-web-text:hover {
    color: #5f0dac;
  }

</style>
