<template>
  <div class="video-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="noMore" infinite-scroll-distance="100">
    <VideoListItem
      v-for="(it, index) in videos"
      :key="index"
      :video="it"
      @active="activeItem(index)"
      ref="VideoListItem"
    ></VideoListItem>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Video } from "@/model/resources";
import { resources } from "@/endpoint/resources";
import VideoListItem from "./video-list-item.vue";

@Component({
  components: {
    VideoListItem
  }
})
export default class VideoDetail extends Vue {
  $refs!: { VideoListItem: VideoListItem[] };

  videos: Video[] = [];
  total: Video[] = [];
  start: number = 0;
  pageSize: number = 10;
  activeIndex: number = -1;
  noMore: boolean = true;

  activeItem(index: number): void {
    if (this.activeIndex >= 0) {
      this.$refs.VideoListItem[this.activeIndex].inactive();
    }
    this.activeIndex = index;
  }

  created() {
    resources().then(reses => {
      this.total = reses;
      this.loadMore()
    });
  }

  loadMore() {
    // 获取下一页数据，直到没有为止
    let start = this.start;
    let end = Math.min(start + this.pageSize, this.total.length);
    this.start = end;
    let data = this.total.slice(start, end);
    if (data && data.length) {
      this.videos.push(...data);
      this.noMore = false
    } else {
      this.noMore = true;
    }
  }
}
</script>

<style lang="scss">
.video-list {
  width: 100%;
  height: 100%;
}
</style>