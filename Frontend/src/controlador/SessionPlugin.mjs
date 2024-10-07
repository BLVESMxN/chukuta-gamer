// SessionPlugin.mjs
import { Session } from './Session.js'; // Adjust the path as needed

export default {
  install(app) {
    // Define a getter for the current session
    Object.defineProperty(app.config.globalProperties, '$session', {
      get() {
        return Session.getInstance();
      },
    });

    // Expose the Session class
    app.config.globalProperties.$Session = Session;
  },
};
