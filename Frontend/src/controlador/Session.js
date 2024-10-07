// Session.js
import { reactive } from 'vue';
import { RequestHandler } from './RequestHandler.mjs';

export class Role {
  static ADMINISTRATIVO = new Role('Administrativo');
  static PROFESOR = new Role('Profesor');
  static ESTUDIANTE = new Role('Estudiante');
  static PADRE = new Role('Padre');
  static GUEST = new Role('Guest');

  constructor(nombre) {
    this.nombre = nombre;
  }
}

export class User {
  static ANONYMOUS = new User('', '', true, Role.GUEST);

  constructor(email, name, isActive = false, role = Role.ESTUDIANTE) {
    this.email = email;
    this.name = name;
    this.isActive = isActive;
    this.role = role;
  }
}

export class Session {
  static #instance = null;
  static httpHandler = new RequestHandler();

  constructor(user) {
    // Create a reactive state object
    this.state = reactive({
      user: user, // Initialize with the provided user
    });
  }

  static getInstance(user = null) {
    if (!Session.#instance) {
      Session.#instance = new Session(user || User.ANONYMOUS);
    } else if (user) {
      // Update the user within the reactive state object
      Session.#instance.state.user = user;
    }
    return Session.#instance;
  }

  isAnonymous() {
    const user = this.state.user;
    return (
      user === User.ANONYMOUS ||
      !user.email ||
      !user.role
    );
  }

  static async getCurrent() {
    let res = await this.httpHandler.getRequest('user/me/');
    if (res.status !== 200) {
      Session.getInstance(User.ANONYMOUS);
    } else {
      const user = this.getUser(res.data);
      Session.getInstance(user); // Update the singleton instance
    }
    return Session.#instance;
  }

  static getUser(userData) {
    const email = userData['email'];
    const name = userData['name'];
    const isActive = userData['is_active'];
    const roleName = userData['role_field'];

    let role;
    switch (roleName) {
      case 'Administrador':
        role = Role.ADMINISTRATIVO;
        break;
      case 'Estudiante':
        role = Role.ESTUDIANTE;
        break;
      case 'Padre':
        role = Role.PADRE;
        break;
      case 'Profesor':
        role = Role.PROFESOR;
        break;
      default:
        role = Role.GUEST;
    }

    return new User(email, name, isActive, role);
  }

  static async login(email, password) {
    const data = {
      email: email,
      password: password,
    };
    let res = await this.httpHandler.postRequest('user/token/', data);
    if (res.status !== 200) {
      Session.getInstance(User.ANONYMOUS);
      throw new Error('Login failed');
    }

    await this.getCurrent(); 
    return Session.#instance;
  }

  static async logout() {
    if (Session.getInstance().isAnonymous()) {
      return false;
    }
    let res = await this.httpHandler.postRequest('user/logout/', {});
    Session.getInstance(User.ANONYMOUS);
    return res.status === 200;
  }
}
