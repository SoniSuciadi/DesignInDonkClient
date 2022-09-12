<template>
  <NavBar />
  <LeftCarosel
    :title="'PNG IMAGES'"
    :description="'PNG is short for Portable Network Graphic, a type of raster image file. It`s particularly popular file type with web designers because it can handle graphics with transparent or semi-transparent backgrounds. The file format isn’t patented, so you can open a PNG using any image editing software without the need for licensing.PNG files, which use the .png extension, can handle 16 million colors — which definitely sets them apart from most file types.'"
    :posts="postPNGImages"
  />
  <RightCarosel
    :title="'BACKGROUND'"
    :description="'Background is what’s behind something — whether it’s physical, like a play’s scenery, or intangible, like a person`s life story or the past facts of a current situation. If you are shy, you might try to stay in the background at parties and avoid attention.'"
    :posts="postBackgroud"
  />
  <LeftCarosel
    :title="'TEMPLATE'"
    :description="'A design template or template is a file created with an overall layout to be used with one or more documents. For example, a word processor may have a template for a resume. With a resume template, the overall layout is designed with placeholder text (e.g., your objective, previous job experience, etc.) that you can replace with information relevant to you.'"
    :posts="postTemplate"
  />
  <FooterBar />
</template>
<script>
import NavBar from "../components/NavBar.vue";
import LeftCarosel from "../components/LeftCarosel.vue";
import RightCarosel from "../components/RightCarosel.vue";
import FooterBar from "../components/FooterBar.vue";
import { usePostStore } from "../stores/post";
import { mapActions, mapState } from "pinia";
export default {
  data() {
    return {
      // postPNGImages: [],
      // postBackgroud: [],
      // postTemplate: [],
    };
  },
  components: { NavBar, LeftCarosel, RightCarosel, FooterBar },
  computed: {
    ...mapState(usePostStore, [
      "postBackgroud",
      "postPNGImages",
      "postTemplate",
    ]),
  },
  methods: {
    ...mapActions(usePostStore, [
      "readPostHome",
      "postCount",
      "setPostBackground",
      "setPostPNGImages",
      "setPostTemplate",
    ]),
  },
  async created() {
    try {
      let PNGImages = await this.readPostHome("PNG Images");
      let Background = await this.readPostHome("Background");
      let Template = await this.readPostHome("Template");
      this.setPostBackground(Background.data.posts);
      this.setPostPNGImages(PNGImages.data.posts);
      this.setPostTemplate(Template.data.posts);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
