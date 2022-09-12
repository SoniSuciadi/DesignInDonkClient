<template>
  <div class="grid md:grid-cols-2 sm:grid-cols-1 mx-4 p-4 rounded-lg">
    <div id="default-carousel" class="relative" data-carousel="static">
      <!-- Carousel wrapper -->
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
      </div>

      <!-- Slider controls -->
    </div>
    <CaroselText :title="title" :description="description" />
  </div>
</template>
<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

import CaroselText from "./CaroselText.vue";
export default {
  props: ["posts", "title", "description"],
  components: { CaroselText, VueperSlides, VueperSlide },
};
</script>
