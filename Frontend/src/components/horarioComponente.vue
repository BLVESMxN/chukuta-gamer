<template>
    <div class="schedule-container">
      <!-- Cabecera con días en español -->
      <div class="schedule-header">
        <div class="empty-header"></div>
        <div v-for="day in days" :key="day" class="day-header">{{ day }}</div>
      </div>
  
      <!-- Contenedor de la cuadrícula -->
      <div class="schedule-grid">
        <!-- Columna de horas -->
        <div class="schedule-hours">
          <div v-for="hour in hours" :key="hour" class="hour">
            {{ hour }}:00
          </div>
        </div>
  
        <!-- Columnas de materias por cada día -->
        <div v-for="day in days" :key="day" class="schedule-column">
          <div v-for="hour in hours" :key="hour" class="schedule-cell">
            <!-- Añadir materias si coinciden con la hora -->
            <div v-for="subject in getSubjectsForHour(day, hour)" :key="subject.name" class="subject">
              <strong>{{ subject.name }}</strong>
              <p>{{ subject.start }} - {{ subject.end }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ScheduleComponent',
    props: {
      subjects: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], // Días en español
        hours: Array.from({ length: 11 }, (_, i) => i + 8) // Horas de 8am a 6pm
      };
    },
    methods: {
      getSubjectsForHour(day, hour) {
        return this.subjects.filter(subject => {
          const startHour = parseInt(subject.start.split(':')[0]);
          const endHour = parseInt(subject.end.split(':')[0]);
          return subject.day === day && hour >= startHour && hour < endHour;
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .schedule-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
  }
  
  .schedule-header {
    display: grid;
    grid-template-columns: 100px repeat(5, 1fr); /* Columna de horas + 5 días */
    grid-gap: 1px;
  }
  
  .empty-header {
    height: 60px;
    background-color: transparent;
  }
  
  .day-header {
    height: 60px;
    background-color: #007bff;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border: 1px solid #ddd;
  }
  
  .schedule-grid {
    display: grid;
    grid-template-columns: 100px repeat(5, 1fr); /* Columna de horas + 5 días */
    grid-gap: 1px;
  }
  
  .schedule-hours {
    display: flex;
    flex-direction: column;
  }
  
  .hour {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #333;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
  }
  
  .schedule-column {
    display: flex;
    flex-direction: column;
  }
  
  .schedule-cell {
    height: 60px;
    border: 1px solid #ddd;
    position: relative;
  }
  
  .subject {
    background-color: #007bff;
    color: white;
    padding: 5px;
    border-radius: 4px;
    font-size: 12px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-sizing: border-box;
  }
  </style>
  