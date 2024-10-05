<template>
    <div class="detalle-persona">
      <h1>Detalles de {{ nombre }}</h1>
      <p>Información de la persona seleccionada: {{ personaSeleccionada ? personaSeleccionada.edad : 'No disponible' }}</p>
      
      <!-- Botones de navegación -->
      <div class="card-container">
      <!-- Card 1 -->
      
      <div class="e-card playing card-1">
        <router-link to="/AsignaturasPadres">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="infotop">
          <br>
          Ver
          <br>
          <div class="name">Asignaturas</div>
        </div>
      </router-link>
      </div>
    
        
      <!-- Repetir el card con variaciones -->
      <div class="e-card playing card-2">
        <router-link to="/AsistenciaPadres">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="infotop">
          <br>
          Ver
          <br>
          <div class="name">Asistencia</div>
        </div></router-link>
        
      </div>
    
        
      <div class="e-card playing card-3">
        <router-link to="/KardexPadres">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="infotop">
          <br>
          Ver
          <br>
          <div class="name">Kardex</div>
        </div>
      </router-link>
      </div>
    
        
      </div>
  
      <router-link to="/MenuPadres">Volver</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EstudiantesPadres',
    props: ['nombre'],
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
      };
    },
    computed: {
      personaSeleccionada() {
        return this.personas.find(persona => persona.nombre === this.nombre);
      },
    },
  };
  </script>
  
  <style scoped>
  .detalle-persona {
    padding: 20px;
    text-align: center;
  }
  
  .detalle-persona p {
    font-size: 18px;
  }
  
  .botones-navegacion {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
  
  button {
    padding: 10px 15px;
    cursor: pointer;
    border: none;
    background-color: #4CAF50;
    color: white;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #45a049;
  }
  .card-container {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  
  .e-card {
    margin: 100px 30px;
    background: transparent;
    box-shadow: 0px 8px 28px -9px rgba(0,0,0,0.45);
    position: relative;
    width: 240px;
    height: 330px;
    border-radius: 16px;
    overflow: hidden;
  }
  
  .card-1 .wave {
    background: linear-gradient(744deg, #af40ff, #5b42f3 60%, #00ddeb);
  }
  
  .card-2 .wave {
    background: linear-gradient(744deg, #ff6347, #ffa07a 60%, #f006b5);
  }
  
  .card-3 .wave {
    background: linear-gradient(744deg, #32cd32, #98fb98 60%, #144ce6);
  }
  
  .card-4 .wave {
    background: linear-gradient(744deg, #ff4500, #ff8c00 60%, #56ff47);
  }
  
  .wave {
    position: absolute;
    width: 540px;
    height: 700px;
    opacity: 0.6;
    left: 0;
    top: 0;
    margin-left: -50%;
    margin-top: -70%;
  }
  
  .wave:nth-child(2),
.wave:nth-child(3) {
  top: 210px;
}

.playing .wave {
  border-radius: 40%;
  animation: wave 3000ms infinite linear;
}

.wave {
  border-radius: 40%;
  animation: wave 55s infinite linear;
}

.playing .wave:nth-child(2) {
  animation-duration: 4000ms;
}

.wave:nth-child(2) {
  animation-duration: 50s;
}

.playing .wave:nth-child(3) {
  animation-duration: 5000ms;
}

.wave:nth-child(3) {
  animation-duration: 45s;
}
  
  .infotop {
    text-align: center;
    font-size: 20px;
    position: absolute;
    top: 5.6em;
    left: 0;
    right: 0;
    color: rgb(255, 255, 255);
    font-weight: 600;
  }
  
  .icon {
    width: 3em;
    margin-top: -1em;
    padding-bottom: 1em; /* Ajustado para dar espacio entre el ícono y el texto */
  }
  
  @keyframes wave {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  