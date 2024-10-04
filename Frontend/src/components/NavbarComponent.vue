<template>
  <nav class="navbar">
    <div class="navbar-left">
      <span v-if="userRole === 'guest'">
        <button @click="toggleMenu" class="menu-button">☰</button>
        <span class="title">SISTEMA DE ESTUDIANTES</span>
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
    </div>

    <div class="navbar-right">
      <button v-if="userRole === 'guest'" @click="showLogin = true" class="login-button">
        <img src="@/assets/usuario_icon.png" alt="user-icon" class="user-icon" />
      </button>

      <div v-else class="user-panel">
        <img src="@/assets/usuario_icon.png" alt="user-icon" class="user-icon" @click="toggleUserOptions" />
        <div v-if="showUserOptions" class="user-options-panel">
          <p class="user-name">{{ username }}</p>
          <router-link to="/editar-datos" class="user-option">Editar datos personales</router-link>
          <router-link to="/cambiar-contrasena" class="user-option">Cambio de contraseña</router-link>
          <button @click="logout" class="user-option logout-button">Cerrar Sesión</button>
          <button @click="showAdminModal = true" class="user-option">Crear Admin</button>
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

    <!-- Modal para Crear Usuario Admin -->
    <div v-if="showAdminModal" class="admin-modal">
      <div class="modal-content">
        <span class="close" @click="showAdminModal = false">&times;</span>
        <h2 class="modal-title">Crear Usuario Admin</h2>
        <div class="modal-body">
          <input type="email" placeholder="Email" v-model="adminEmail" class="input-field" />
          <input type="text" placeholder="Nombre" v-model="adminName" class="input-field" />
          <input type="password" placeholder="Contraseña" v-model="adminPassword" class="input-field" />
          <button @click="crearUsuarioAdmin" class="login-button">Crear Admin</button>
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
      showUserOptions: false,
      showAdminModal: false,
      username: '',
      password: '',
      userRole: 'guest', // guest, estudiante, docente
      adminEmail: '',
      adminPassword: '',
      adminName: '',
    };
  },
  methods: {
    isActive(route) {
      return this.$route.path === route;
    },
    toggleUserOptions() {
      this.showUserOptions = !this.showUserOptions;
    },
    async crearUsuarioAdmin() {
      const resultado = await authService.crearUsuarioAdmin(this.adminEmail, this.adminPassword, this.adminName);
      if (resultado.exito) {
        alert('Usuario admin creado exitosamente.');
      } else {
        alert(`Error: ${resultado.error}`);
      }
      this.showAdminModal = false;
    },
    async login() {
      const resultado = await authService.login(this.username, this.password);
      if (resultado.exito) {
        this.userRole = resultado.rol;
        this.$router.push('/'); // Redirigir a tu ruta deseada
      } else {
        alert(`Error: ${resultado.error}`);
      }
      this.showLogin = false;
    },
    logout() {
      const resultado = authService.logout();
      this.userRole = resultado.rol;
      this.username = '';
      this.password = '';
      this.$router.push(resultado.ruta);
    }
  }
};
</script>

<style src="../views/styles/navbarcomponent.css"></style>


