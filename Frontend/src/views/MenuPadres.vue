<template>
    <div>
      <div class="banner">
        <h1>Bienvenido al Listado de Personas</h1>
        <p>Este es un ejemplo de cómo navegar entre diferentes grupos de personas usando Vue.js.</p>
      </div>
      
      <h2>Lista de Personas</h2>
      <div class="lista-personas">
        <div 
          class="persona" 
          v-for="(persona, index) in paginatedPersonas" 
          :key="index"
        >
          <div class="imagen-circular">
            <router-link :to="{ name: 'EstudiantesPadres', params: { nombre: persona.nombre }}">
              <img src="https://via.placeholder.com/100" alt="Imagen de Persona">
            </router-link>
          </div>
          <p class="nombre">{{ persona.nombre }}</p>
        </div>
      </div>
      <div class="controles">
        <button @click="paginaAnterior" :disabled="paginaActual === 0">Anterior</button>
        <button @click="paginaSiguiente" :disabled="paginaActual >= maxPaginas - 1">Siguiente</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MenuPadres',
    data() {
      return {
        personas: [
          { nombre: 'Juan', edad: 30 },
          { nombre: 'Ana', edad: 25 },
          { nombre: 'Pedro', edad: 28 },
          { nombre: 'Carla', edad: 24 },
          { nombre: 'Luis', edad: 32 },
          { nombre: 'Maria', edad: 27 },
        ],
        paginaActual: 0,
        personasPorPagina: 3,
      };
    },
    computed: {
      paginatedPersonas() {
        const inicio = this.paginaActual * this.personasPorPagina;
        const fin = inicio + this.personasPorPagina;
        return this.personas.slice(inicio, fin);
      },
      maxPaginas() {
        return Math.ceil(this.personas.length / this.personasPorPagina);
      },
    },
    methods: {
      paginaSiguiente() {
        if (this.paginaActual < this.maxPaginas - 1) {
          this.paginaActual++;
        }
      },
      paginaAnterior() {
        if (this.paginaActual > 0) {
          this.paginaActual--;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .banner {
    background-color: #4CAF50;
    color: white;
    padding: 20px;
    text-align: center;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  
  .lista-personas {
    display: flex;
    gap: 20px;
    justify-content: space-around;
  }
  
  .persona {
    width: 120px;
    text-align: center;
  }
  
  .imagen-circular {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
  }
  
  .imagen-circular img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
  
  .nombre {
    margin-top: 10px;
    font-weight: bold;
  }
  
  .controles {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  button {
    padding: 10px;
    cursor: pointer;
    border: none;
    background-color: #4CAF50;
    color: white;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  button:not(:disabled):hover {
    background-color: #45a049;
  }
  </style>
  