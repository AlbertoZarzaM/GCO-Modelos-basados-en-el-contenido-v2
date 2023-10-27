<template>

<title> Sistemas de recomendación. Métodos de filtrado colaborativo </title>

  <Cabecera />
  

<br>
<h1 style="margin-left: 5em;">   Bienvenido!</h1>
<br>
<br>


<div class="container">
  <div class="row">

    <div class="col-lg-6 col-md-6 col-sm-12">
      <h2>Documento a analizar</h2>
    <input type="file" id="fileInput1" @change="cargarArchivo(1)"/>
    <h2>Fichero Stopwords</h2>
    <input type="file" id="fileInput2" @change="cargarArchivo(2)"/>
    <h2>Fichero lematización</h2>
    <input type="file" id="fileInput3" @change="cargarArchivo(3)"/>
    </div>



  <div class="col-lg-6 col-md-6 col-sm-12" style="text-align: center;">

    AQUI DIGO DE MOSTRAR LOS RESULTADOS ;)

  </div>
  </div>
</div>

<br>
<br>
<div class="container" >
  <button type="button" class="btn btn-warning" @click= "procesar()">Procesar</button>
  <div id="result"></div>
</div>

 <PiePag />

</template>

<script setup lang="ts">
import {cargarArchivo, procesar} from './logica'


</script>



  




<style>

input{
  padding: 2em;
}
.custom-table {
  border: 0.05em solid black;
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  border: 0.05em solid black;
  padding: 0.5em;
}

.focus-table th:focus,
.focus-table td:focus {
  outline: 0.25em solid #14213D;
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
