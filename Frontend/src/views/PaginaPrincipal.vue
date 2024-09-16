<template>
  <div>
    <HeaderComponent />
    <SlideshowComponent />
    <AboutComponent />
    <ContactComponent />
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import SlideshowComponent from "@/components/SlideShowComponent.vue";
import AboutComponent from "@/components/AboutComponent.vue";
import ContactComponent from "@/components/ContactComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  components: {
    HeaderComponent,
    SlideshowComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
  },
};
</script>

<style src="./styles/styles.css"></style>