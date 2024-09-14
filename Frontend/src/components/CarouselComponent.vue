<template>
    <div class="carousel-container">
      <div class="carousel">
        <div 
          class="carousel-item" 
          v-for="(image, index) in images" 
          :key="index" 
          :style="{ backgroundImage: 'url(' + image + ')' }"
          :class="{ active: currentIndex === index }"
        ></div>
      </div>
      <button class="prev-btn" @click="prevSlide">❮</button>
      <button class="next-btn" @click="nextSlide">❯</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CarouselComponent',
    props: {
      images: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        currentIndex: 0
      };
    },
    methods: {
      nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      },
      prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      }
    }
  };
  </script>
  
  <style src="../views/styles/carouselcomponent.css"></style>
  