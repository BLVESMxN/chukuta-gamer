export default {
  login(username, password) {
    if (username === 'estudiante' && password === '1234') {
      return { role: 'estudiante', route: '/inicio-estudiante' };
    } else if (username === 'docente' && password === '1234') {
      return { role: 'docente', route: '/inicio-docente' };
    } else {
      return { role: 'guest', route: null, error: 'Credenciales incorrectas' };
    }
  },
  logout() {
    return { role: 'guest', route: '/' };
  }
};

  