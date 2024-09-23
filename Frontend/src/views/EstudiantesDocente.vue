<template>
  <div>
    <h1>Estudiantes - Docente</h1>
    <div class="estudiante-grid">
      <lista-estudiantes :estudiantes="estudiantes" />
    </div>
  </div>
</template>

<script>
import ListaEstudiantes from '../components/ListaComponent.vue';

export default {
  name: 'EstudiantesDocente',
  components: {
    'lista-estudiantes': ListaEstudiantes
  },
  data() {
    return {
      estudiantes: [
        { id: 1, nombre: 'Juan Pérez', carrera: 'Ingeniería' },
        { id: 2, nombre: 'María López', carrera: 'Derecho' },
        { id: 3, nombre: 'Carlos García', carrera: 'Medicina' }
      ]
    };
  }
};
</script>
