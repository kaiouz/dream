<template>
  <div class="frame-preview" :style="style"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Thumbs } from "@/model/resources";
import { content } from "@/endpoint/resources";

@Component({
  components: {}
})
export default class FramePreview extends Vue {
  @Prop() readonly thumbs!: Thumbs;
  private bgUrl: string = "";
  private width: number = 0;
  private height: number = 0;
  private bgWidth: number = 0;
  private bgHeight: number = 0;
  private bgCols: number = 0;
  private no: number = 2
  private timeout?: number

  get style() {
    let x = -(this.no % this.bgCols) * this.width;
    let y = -(Math.floor(this.no / this.bgCols)) * this.height;
    return {
      "background-position": `${x}px ${y}px`,
      "background-image": `url(${this.bgUrl})`,
      "background-size": `${this.bgWidth}px ${this.bgHeight}px`
    };
  }

  startPreview() {
      this.timeout = setInterval(() => {
          this.no = ++this.no % this.thumbs.count
      }, 300)
  }

  stopPreview() {
      clearInterval(this.timeout)
  }

  mounted() {
    let root = this.$el as HTMLElement;
    this.bgUrl = encodeURI(content(this.thumbs.path));
    this.bgCols = this.thumbs.width / this.thumbs.thumbWidth
    this.width = root.offsetWidth
    this.height = root.offsetHeight
    this.bgWidth = this.width / this.thumbs.thumbWidth * this.thumbs.width
    this.bgHeight = this.height / this.thumbs.thumbHeight * this.thumbs.height
    this.startPreview()
  }

  destroyed() {
      this.stopPreview()
  }
}
</script>

<style lang="scss">
.frame-preview {
  overflow: hidden;
}
</style>

