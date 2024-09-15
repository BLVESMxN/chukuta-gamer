<template>
    <div id="app">
      <v-btn @click="mostrar">Cargar datos</v-btn>
    </div>
  </template>
  
  <script>
  // Importa la instancia de Vue desde tu archivo .mjs
  import { vueApp } from '../modelo/PreviewsTry/Prueba1.mjs';
  
  export default {
    name: 'MiComponente',
    methods: {
      // Puedes acceder a las funciones de tu archivo .mjs aquí
      mostrar() {
        vueApp.mostrar();
      }
    }
  };
  </script>
  
  <style>
  /* Estilos del componente */
  </style>
  