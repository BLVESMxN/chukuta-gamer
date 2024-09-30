<template>
    <div class="lista-materias">
      <h1>Lista de Materias</h1>
      <div class="materias-grid">
        <div class="card" v-for="(materia, index) in materias" :key="index">
            <div class="card-details">
                <p class="text-title">{{ materia.nombre }}</p>
                <p class="text-body">{{ materia.profesor }}</p>
            </div>
            <button class="card-button">Más...</button>
            </div>
        </div>
      </div>
    <router-link to="/EstudiantesPadres">Volver a la lista de personas</router-link>
  </template>
  
  <script>
  export default {
    name: 'ListaMaterias',
    data() {
      return {
        materias: [
          { nombre: 'Matemáticas', profesor: 'Prof. García', horario: 'Lunes y Miércoles 10:00 - 12:00' },
          { nombre: 'Física', profesor: 'Prof. López', horario: 'Martes y Jueves 08:00 - 10:00' },
          { nombre: 'Química', profesor: 'Prof. Martínez', horario: 'Miércoles y Viernes 11:00 - 13:00' },
          { nombre: 'Historia', profesor: 'Prof. Fernández', horario: 'Martes y Jueves 12:00 - 14:00' },
          { nombre: 'Religion', profesor: 'Prof. Fernández', horario: 'Martes y Jueves 12:00 - 14:00' },
          { nombre: 'Filosofia', profesor: 'Prof. Fernández', horario: 'Martes y Jueves 12:00 - 14:00' },
          { nombre: 'Computacion', profesor: 'Prof. Fernández', horario: 'Martes y Jueves 12:00 - 14:00' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .lista-materias {
    padding: 20px;
    max-width: 100%;
    margin: 0 auto;
    text-align: left;
    
  }
  
  .lista-materias h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  /* From Uiverse.io by alexruix */ 
.card {
 width: 190px;
 height: 254px;
 border-radius: 20px;
 background: #f5f5f5;
 position: relative;
 padding: 1.8rem;
 border: 2px solid #c3c6ce;
 transition: 0.5s ease-out;
 overflow: visible;
}

.card-details {
 color: black;
 height: 100%;
 gap: .5em;
 display: grid;
 place-content: center;
}

.card-button {
 transform: translate(-50%, 125%);
 width: 60%;
 border-radius: 1rem;
 border: none;
 background-color: #008bf8;
 color: #fff;
 font-size: 1rem;
 padding: .5rem 1rem;
 position: absolute;
 left: 50%;
 bottom: 0;
 opacity: 0;
 transition: 0.3s ease-out;
}

.text-body {
 color: rgb(134, 134, 134);
}

/*Text*/
.text-title {
 font-size: 1.5em;
 font-weight: bold;
}

/*Hover*/
.card:hover {
 border-color: #008bf8;
 box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
}

.card:hover .card-button {
 transform: translate(-50%, 50%);
 opacity: 1;
}

.materias-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
  </style>
  