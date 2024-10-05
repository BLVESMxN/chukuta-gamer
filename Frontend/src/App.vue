<template>
  <div id="app">
    <Navbar /> <!-- Navbar superior -->
    <router-view></router-view> <!-- Contenido dinámico -->
  </div>
</template>

<script>
import Navbar from './components/NavbarComponent.vue';

export default {
  components: {
    Navbar,
  },
};
</script>

<style>
/* Asegúrate de que el contenedor principal ocupe toda la pantalla */
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

router-view {
  flex: 1;
}
</style>
