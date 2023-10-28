<template>

<title> Sistemas de recomendación. Métodos de filtrado colaborativo </title>

 <Cabecera />
<body>
 <Home />
</body>


<footer>
 <PiePag />
</footer>

</template>

<script setup lang="ts">

import Cabecera from './components/Cabecera.vue';

import PiePag from './components/PiePag.vue';

import Home from './components/Home.vue';




</script>


<style>

body {
  margin: 0;
    padding: 0;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
}

input{
  padding: 2em;
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
