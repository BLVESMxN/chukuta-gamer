<template>
    <div class="contact-section" id="contact">
      <div>
        <p><i class="fa fa-map-marker fa-fw"></i> LA PAZ BOLIVIA</p>
        <p><i class="fa fa-phone fa-fw"></i> CELULAR: 777777777</p>
        <p><i class="fa fa-envelope fa-fw"></i> Email: mail@mail.com</p>
      </div>
      <form action="/action_page.php" target="_blank">
        <input type="text" placeholder="Name" required name="Name" />
        <input type="text" placeholder="Email" required name="Email" />
        <input type="text" placeholder="Subject" required name="Subject" />
        <input type="text" placeholder="Message" required name="Message" />
        <button type="submit">
          <i class="fa fa-paper-plane"></i> MANDAR MENSAJE
        </button>
      </form>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style src="../views/styles/styles.css"></style>
  