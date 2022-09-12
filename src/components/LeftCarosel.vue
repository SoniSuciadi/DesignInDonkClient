<template>
  <div class="grid md:grid-cols-2 sm:grid-cols-1 mx-4 p-4 rounded-lg">
    <CaroselText :title="title" :description="description" />
    <div
      id="default-carousel"
      class="relative order-1 sm:order-2 md:order-2"
      data-carousel="static"
    >
      <!-- Carousel wrapper -->
      <div>
        <div class="relative overflow-hidden rounded-lg h-auto">
          <!-- Item 1 -->
          <vueper-slides
            :visible-slides="1"
            :arrows-outside="false"
            :bullets="false"
            :infinite="false"
            :dragging-distance="100"
            :touchable="true"
            :fixed-height="'400px'"
            :disable-arrows-on-edges="true"
          >
            <vueper-slide
              v-for="(post, i) in posts"
              :key="i"
              :image="post.imgUrl"
            >
            </vueper-slide>
          </vueper-slides>
          <!-- <CaroselItem v-for="(post, i) in posts" :key="i" :post="post" /> -->
        </div>
      </div>

      <!-- Slider controls -->
      <!-- <CaroselSliderControl /> -->
    </div>
  </div>
</template>
<script>
import CaroselText from "./CaroselText.vue";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  props: ["posts", "title", "description"],
  components: {
    CaroselText,
    VueperSlides,
    VueperSlide,
  },
};
</script>