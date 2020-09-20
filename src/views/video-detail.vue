<template>
  <div>
    <video class="video-player" controls autoplay :src="videoUrl()"></video>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Video } from "@/model/resources";
import { API_BASE_URL } from "@/endpoint/resources";

@Component({
  components: {}
})
export default class VideoDetail extends Vue {
  videoUrl() {
    let path = this.$route.query.path;
    return `${API_BASE_URL}/content?path=${path}`;
  }
}
</script>

<style lang="scss">
.video-player {
  width: 100%;
  height: 100%;
}
</style>