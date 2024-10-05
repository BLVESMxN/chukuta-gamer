<template>
  <div class="admin-layout">
    <NavbarLateral />
    <div class="admin-content">
      <router-view></router-view> <!-- Contenido dinámico que cambia según la ruta -->
    </div>
  </div>
</template>

<script>
import NavbarLateral from "@/components/NavbarLateral.vue";

export default {
  components: {
    NavbarLateral,
  },
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh; /* Aseguramos que el layout ocupe toda la altura de la pantalla */
  overflow: hidden; /* Prevenir desbordamiento lateral */
}

.admin-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto; /* Permitir scroll en el contenido principal si es necesario */
  background-color: #ecf0f1;
  margin-left: 250px; /* Espacio para el navbar lateral */
}
</style>
