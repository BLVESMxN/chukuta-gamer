<template>
  <div>
    <h1>Inicio - Estudiante</h1>
    <p>Bienvenido a la página de inicio para estudiantes.</p>
    
    <!-- Componente de Horario -->
    <ScheduleComponent :subjects="dummySubjects" />
  </div>
</template>

<script>
import ScheduleComponent from '../components/horarioComponente.vue';

export default {
  name: 'InicioEstudiante',
  components: {
    ScheduleComponent
  },
  data() {
    return {
      dummySubjects: [
        { name: 'Matemáticas', day: 'Lunes', start: '09:00', end: '11:00' },
        { name: 'Física', day: 'Martes', start: '10:00', end: '12:00' },
        { name: 'Historia', day: 'Miércoles', start: '13:00', end: '15:00' },
        { name: 'Inglés', day: 'Jueves', start: '08:00', end: '10:00' },
        { name: 'Educación Física', day: 'Viernes', start: '14:00', end: '16:00' }
      ]
    };
  }
};
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí */
</style>
