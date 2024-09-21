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
        { id: 1, nombre: 'Juan Pérez', curso: '6 A' },
        { id: 2, nombre: 'María López', curso: '5 B' },
        { id: 3, nombre: 'Carlos García', curso: '3 D' }
      ]
    };
  }
};
</script>
