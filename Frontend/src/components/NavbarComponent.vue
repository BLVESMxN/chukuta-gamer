<template>
  <nav class="navbar">
    <div class="navbar-left">
      <span v-if="userRole === 'guest'">
        <button @click="toggleMenu" class="menu-button">☰</button>
        <span class="title"></span>
      </span>
      <span v-if="userRole === 'estudiante'">
        <router-link to="/inicio-estudiante" :class="{ active: isActive('/inicio-estudiante') }" class="nav-link">INICIO</router-link>
        <router-link to="/materias-estudiante" :class="{ active: isActive('/materias-estudiante') }" class="nav-link">MATERIAS</router-link>
      </span>
      <span v-if="userRole === 'docente'">
        <router-link to="/inicio-docente" :class="{ active: isActive('/inicio-docente') }" class="nav-link">INICIO</router-link>
        <router-link to="/materias-docente" :class="{ active: isActive('/materias-docente') }" class="nav-link">MATERIAS</router-link>
        <router-link to="/estudiantes-docente" :class="{ active: isActive('/estudiantes-docente') }" class="nav-link">ESTUDIANTES DOCENTES</router-link>
        <router-link to="/horarios-docente" :class="{ active: isActive('/horarios-docente') }" class="nav-link">HORARIOS DOCENTE</router-link>
      </span>
      <span v-if="userRole === 'Administrador'">
        <router-link to="/grados-admin" :class="{ active: isActive('/grados-admin') }" class="nav-link"></router-link>
      </span>
    </div>

    <div class="navbar-right">
      <button v-if="userRole === 'guest'" @click="showLogin = true" class="login-button">
        <img src="@/assets/usuario_icon.png" alt="user-icon" class="user-icon" />
      </button>

      <!-- Si el usuario está autenticado, mostrar el icono y el panel de opciones -->
      <div v-else class="user-panel">
        <img src="@/assets/usuario_icon.png" alt="user-icon" class="user-icon" @click="toggleUserOptions" />
        <!-- Mostrar el panel de opciones al hacer clic en el icono -->
        <div v-if="showUserOptions" class="user-options-panel">
          <p class="user-name">{{ username }}</p>
          <router-link to="/editar-datos" class="user-option">Editar datos personales</router-link>
          <router-link to="/cambiar-contrasena" class="user-option">Cambio de contraseña</router-link>
          <button @click="logout" class="user-option logout-button">Cerrar Sesión</button>
        </div>
      </div>
    </div>

    <!-- Modal de Inicio de Sesión -->
    <div v-if="showLogin" class="login-modal">
      <div class="modal-content">
        <span class="close" @click="showLogin = false">&times;</span>
        <h2 class="modal-title">Iniciar Sesión</h2>
        <div class="modal-body">
          <input type="text" placeholder="Usuario" v-model="username" class="input-field" />
          <input type="password" placeholder="Contraseña" v-model="password" class="input-field" />
          <button @click="login" class="login-button">Ingresar</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import authService from '../controlador/authService'; // Importa el servicio de autenticación

export default {
  data() {
    return {
      showLogin: false,
      showUserOptions: false, // Para controlar el panel de opciones del usuario
      username: '',
      password: '',
      userRole: 'guest', // guest, estudiante, docente, Administrador
    };
  },
  methods: {
    isActive(route) {
      return this.$route.path === route;
    },
    toggleUserOptions() {
      this.showUserOptions = !this.showUserOptions;
    },
    async login() {
      const result = await authService.login(this.username, this.password);
      if (result.route) {
        this.userRole = result.role;
        console.log("Login exitoso:", result);
        this.$router.push(result.route);
      } else {
        alert(result.error);
      }
      this.showLogin = false;
    },
    logout() {
      const result = authService.logout();
      this.userRole = result.role;
      this.username = '';
      this.password = '';
      this.$router.push(result.route);
    }
  }
};
</script>

<style src="../views/styles/navbarcomponent.css"></style>
