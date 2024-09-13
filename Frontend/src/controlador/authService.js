import { RequestHandler } from "./RequestHandler.mjs";

export default {
  async login(username, password) {
    var handler = new RequestHandler();

    return handler.postRequest('/user/token/', {
      email: username,
      password: password,
    }, {})
    .then(res => {
      // Log the response to debug
      console.log('Response:', res);
      alert("Login exitoso");
      if (res && res.status === 200) {
        
        return { role: 'estudiante', route: '/inicio-estudiante' };
      } else {
        return { role: 'guest', route: null, error: 'Credenciales incorrectas' };
      }
    })
    .catch(error => {
      alert("Error");
      console.error('Error during login:', error);
      return { role: 'guest', route: null, error: 'Error en el servidor' };
    });
  },
  logout() {
    return { role: 'guest', route: '/' };
  }
};

  