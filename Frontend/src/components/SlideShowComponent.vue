<template>
  <div class="container">
    <div class="slideshow">
      <img :src="images[currentImageIndex]" alt="Slideshow Image" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        require('@/assets/imagen6.jpeg'),
        require('@/assets/imagen5.jpeg'),
        require('@/assets/imagen3.jpg'),
      ],
      currentImageIndex: 0,
      intervalId: null,
    };
  },
  mounted() {
    this.startSlideshow();
  },
  methods: {
    startSlideshow() {
      this.intervalId = setInterval(() => {
        this.nextImage();
      }, 3000);
    },
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    },
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
};
</script>

<style src="../views/styles/styles.css"></style>
