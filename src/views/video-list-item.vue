<template>
  <div class="video-item" @click="gotoDetail()" @touchstart="active()">
    <div class="video-preview">
      <img
        class="video-cover"
        :class="fillH() ? 'video-cover-fill-h' : 'video-cover-fill-v'"
        :src="coverUrl(video.preview.cover)"
        alt="封面"
      />
      <FramePreview v-if="showFramePreview" class="frame-preview" :thumbs="video.preview.thumbs"></FramePreview>
    </div>
    <div class="video-title">{{video.name}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Video } from "@/model/resources";
import FramePreview from "./frame-preview.vue";
import { content } from "@/endpoint/resources";

@Component({
  components: { FramePreview }
})
export default class VideoListItem extends Vue {
  @Prop() readonly video!: Video;
  private showFramePreview: boolean = false

  active(): void {
    this.showFramePreview = true;
    this.$emit('active')
  }

  inactive(): void {
    this.showFramePreview = false;
  }

  fillH(): boolean {
    return this.video.height / this.video.width <= 0.5625;
  }

  gotoDetail(): void {
    this.$router.push({
      path: process.env.VUE_APP_API_PUB_PATH + "/video-detail",
      query: { path: this.video.path }
    });
  }

  coverUrl(path: string): string {
    return content(path);
  }
}
</script>

<style lang="scss">
.video-item {
  background-color: black;
}
.video-cover-fill-h {
  width: 100%;
}
.video-cover-fill-v {
  height: 100%;
}
.frame-preview {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  transition: opacity 0.3s;
  z-index: 1;
}
.video-preview {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.video-preview::before {
  content: "";
  float: left;
  padding-bottom: 56.25%;
}
.video-preview::after {
  clear: both;
  content: "";
  display: table;
}
.video-title {
  color: white;
  word-break: break-all;
  white-space: normal;
  padding: 4px 8px;
}
</style>