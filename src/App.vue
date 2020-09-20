<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
  <!-- <transition name="slide-left"> -->

  <!-- </transition> -->
</template>

<style lang="scss">
</style>
