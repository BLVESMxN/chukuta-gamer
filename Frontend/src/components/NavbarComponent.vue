<template>
  <nav class="navbar">
    <div class="navbar-left">
      <!-- Guest Navbar -->
      <span v-if="userRole === 'guest'">
        <button @click="toggleMenu" class="menu-button">☰</button>
        <span class="title">SISTEMA DE ESTUDIANTES</span>
      </span>

      <!-- Estudiante Navbar -->
      <span v-if="userRole === 'estudiante'">
        <router-link to="/inicio-estudiante" :class="{ active: isActive('/inicio-estudiante') }" class="nav-link">INICIO</router-link>
        <router-link to="/materias-estudiante" :class="{ active: isActive('/materias-estudiante') }" class="nav-link">MATERIAS</router-link>
      </span>

      <!-- Profesor Navbar -->
      <span v-if="userRole.nombre === 'Profesor'">
        <router-link
          to="/inicio-docente"
          :class="{ active: isActive('/inicio-docente') }"
          class="nav-link"
          >INICIO</router-link
        >
        <router-link
          to="/materias-docente"
          :class="{ active: isActive('/materias-docente') }"
          class="nav-link"
          >MATERIAS</router-link
        >
        <router-link
          to="/estudiantes-docente"
          :class="{ active: isActive('/estudiantes-docente') }"
          class="nav-link"
          >ESTUDIANTES</router-link
        >
        <router-link
          to="/horarios-docente"
          :class="{ active: isActive('/horarios-docente') }"
          class="nav-link"
          >HORARIOS</router-link
        >
      </span>
    </div>

    <div class="navbar-right">
      <!-- Login Button for Guests -->
      <button v-if="userRole === 'guest'" @click="showLogin = true" class="login-button">
        <img src="@/assets/usuario_icon.png" alt="user-icon" class="user-icon" />
      </button>

      <!-- User Panel for Logged-In Users -->
      <div v-else class="user-panel">
        <img src="@/assets/usuario_icon.png" alt="user-icon" class="user-icon" @click="toggleUserOptions" />
        <div v-if="showUserOptions" class="user-options-panel">
          <p class="user-name">{{ username }}</p>
          <router-link to="/editar-datos" class="user-option"
            >Editar datos personales</router-link
          >
          <router-link to="/cambiar-contrasena" class="user-option"
            >Cambio de contraseña</router-link
          >
          <button @click="logout" class="user-option logout-button">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>

    <!-- Login Modal -->
    <div v-if="showLogin" class="login-modal">
      <div class="modal-content">
        <span class="close" @click="showLogin = false">&times;</span>
        <h2 class="modal-title">Iniciar Sesión</h2>
        <div class="modal-body">
          <input type="text" placeholder="Usuario" v-model="usernameInput" class="input-field" />
          <input type="password" placeholder="Contraseña" v-model="passwordInput" class="input-field" />
          <button @click="login" class="login-button">Ingresar</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { Role } from '../controlador/Session';

export default {
  data() {
    return {
      showLogin: false,
      showUserOptions: false,
      usernameInput: '',
      passwordInput: '',
    };
  },
  computed: {
    userRole() {
      if (this.$session.isAnonymous()) {
        return Role.GUEST;
      }
      return this.$session.state.user.role;
    },
    username() {
      return this.$session.state.user.name || '';
    },
  },
  methods: {
    isActive(route) {
      return this.$route.path === route;
    },
    toggleUserOptions() {
      this.showUserOptions = !this.showUserOptions;
    },
    async login() {
      try {
        await this.$Session.login(this.usernameInput, this.passwordInput);
        this.showLogin = false;
        this.usernameInput = '';
        this.passwordInput = '';

        console.log(this.$Session.getInstance().state.user.role);
        console.log(this.userRole);

        if (this.userRole.nombre === 'Estudiante') {
          this.$router.push('/inicio-estudiante');
        } else if (this.userRole.nombre === 'Profesor') {
          this.$router.push('/inicio-docente');
        } else if(this.userRole.nombre === 'Administrativo'){
          this.$router.push('/grados-admin');
        } else if(this.userRole.nombr === 'Padre'){
          console.log("Y la contraseña ========================================================================")
        }
        else {
          this.$router.push('/');
        }
      } catch (error) {
        alert('Error al iniciar sesión: ' + error.message);
      }
    },
    async logout() {
      try {
        await this.$Session.logout();
        this.showUserOptions = false;
        this.$router.push('/'); 
      } catch (error) {
        alert('Error al cerrar sesión: ' + error.message);
      }
    },
  },
};
</script>

<style src="../views/styles/navbarcomponent.css"></style>
