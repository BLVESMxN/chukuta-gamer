<template>
    <div class="calendario-tareas">
      <h1>Calendario de Asistencias y Faltas</h1>
      <vue-cal 
        :events="eventosTareas" 
        default-view="month"
        time="24"
        class="calendario"
        :highlight="fechasDestacadas"
      />
      <div class="resumen">
        <p>Total de Asistencias: {{ totalAsistencias }}</p>
        <p>Total de Faltas: {{ totalFaltas }}</p>
      </div>
      <router-link to="/EstudiantesPadres">Volver a la lista de personas</router-link>
    </div>
  </template>
  
  <script>
  import VueCal from 'vue-cal';
  import 'vue-cal/dist/vuecal.css';
  
  export default {
    name: 'CalendarioTareas',
    components: {
      VueCal,
    },
    data() {
      return {
        tareas: [
          { titulo: 'Asistencia clase Matemáticas', fecha: '2024-10-05', tipo: 'asistencia', color: '#32CD32' }, // LimeGreen
          { titulo: 'Falta clase Física', fecha: '2024-10-10', tipo: 'falta', color: '#FF6347' }, // Tomato
          { titulo: 'Asistencia clase Química', fecha: '2024-10-15', tipo: 'asistencia', color: '#32CD32' }, // LimeGreen
          { titulo: 'Falta clase Historia', fecha: '2024-10-20', tipo: 'falta', color: '#FF6347' }, // Tomato
        ],
      };
    },
    computed: {
      eventosTareas() {
        return this.tareas.map(tarea => ({
          start: tarea.fecha,
          end: tarea.fecha,
          title: tarea.titulo,
          color: tarea.color,
        }));
      },
      totalAsistencias() {
        return this.tareas.filter(tarea => tarea.tipo === 'asistencia').length;
      },
      totalFaltas() {
        return this.tareas.filter(tarea => tarea.tipo === 'falta').length;
      },
      fechasDestacadas() {
        // Devuelve una lista de fechas que se desea destacar
        return this.tareas.map(tarea => tarea.fecha);
      },
    },
  };
  </script>
  
  <style scoped>
  .calendario-tareas {
    padding: 20px;
    max-width: 80%;
    margin: 0 auto;
    text-align: center;
  }
  
  h1 {
    margin-bottom: 20px;
  }
  
  .calendario {
    margin: 20px 0;
    width: 80%;
    height: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  
  /* Estilo para las fechas destacadas */
  .vuecal__cell.vuecal__cell--highlighted {
    background-color: #ea00ff !important;
    color: #ff0000;
  }
  
  .resumen {
    margin-top: 20px;
    text-align: center;
    font-weight: bold;
  }
  
  .router-link {
    display: block;
    margin-top: 20px;
    text-align: center;
    color: #4CAF50;
    text-decoration: none;
    font-weight: bold;
  }
  
  .router-link:hover {
    text-decoration: underline;
  }
  </style>
  