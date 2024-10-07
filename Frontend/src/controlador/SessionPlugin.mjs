import { Session } from './Session.js'; 

export default {
  install(app) {
    const session = Session.getInstance();

    Object.defineProperty(app.config.globalProperties, '$session', {
      get() {
        return session;
      },
    });

    app.config.globalProperties.$Session = Session;
  },
};
