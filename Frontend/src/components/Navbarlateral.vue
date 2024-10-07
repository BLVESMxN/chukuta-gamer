<template>
  <div class="navbar-lateral">
    <h2 class="navbar-title">Panel de Administración</h2>
    <ul class="navbar-list">
      <li class="navbar-item" @click="navigate('/grados-admin')">
        <i class="fas fa-graduation-cap"></i> Grados
      </li>
      <li class="navbar-item" @click="navigate('/colegios-admin')">
        <i class="fas fa-school"></i> Colegios
      </li>
      <li class="navbar-item" @click="navigate('/asignaturas-admin')">
        <i class="fas fa-book"></i> Asignaturas
      </li>
      <li class="navbar-item" @click="navigate('/periodos-admin')">
        <i class="fas fa-calendar"></i> Periodos
      </li>
      <li class="navbar-item" @click="navigate('/horarios-admin')">
        <i class="fas fa-clock"></i> Horarios
      </li>
      <li class="navbar-item" @click="navigate('/profesores-admin')">
        <i class="fas fa-chalkboard-teacher"></i> Profesores
      </li>
      <li class="navbar-item" @click="navigate('/cursos-admin')">
        <i class="fas fa-book-open"></i> Cursos
      </li>
      <li class="navbar-item" @click="navigate('/Padres-Admin')">
        <i class="fas fa-users-cog"></i> Padres
      </li>
      <li class="navbar-item" @click="navigate('/Estudiante-Admin')">
        <i class="fas fa-pencil"></i> Estudiantes
      </li>
      <li class="navbar-item" @click="navigate('/Inscripciones-Admin')">
        <i class="fas fa-list-check"></i> Inscripciones
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    navigate(route) {
      this.$router.push(route); // Cambia la ruta
    },
  },
};
</script>

<style scoped>
.navbar-lateral {
  width: 250px;
  height: 100vh; /* Ocupa toda la altura de la pantalla */
  background-color: #004d40; /* Cambiado a un verde oscuro similar al navbar superior */
  color: white;
  padding: 20px;
  position: fixed; /* Fijo al lado izquierdo de la pantalla */
  top: 0;
  left: 0;
  overflow-y: auto; /* Permitir scroll si el contenido es demasiado largo */
}

.navbar-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ffffff; /* Texto del título en blanco */
  text-align: center;
  border-bottom: 2px solid #ffffff;
  padding-bottom: 10px;
}

.navbar-list {
  list-style: none;
  padding: 0;
}

.navbar-item {
  margin: 10px 0;
  padding: 12px;
  cursor: pointer;
  background-color: #00695c; /* Fondo verde intermedio */
  border-radius: 5px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
  color: white;
  font-weight: 500;
}

.navbar-item i {
  margin-right: 10px;
}

.navbar-item:hover {
  background-color: #00796b; /* Fondo ligeramente más claro en hover */
}

.navbar-item.active {
  background-color: #004d40; /* Mantener el color activo como el fondo del navbar */
}
</style>
