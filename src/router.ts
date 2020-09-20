import Vue from 'vue'
import Router from 'vue-router'
import VideoList from '@/views/video-list.vue'
import VideoDetail from '@/views/video-detail.vue'

Vue.use(Router)

let pubPath = process.env.VUE_APP_API_PUB_PATH

export default new Router({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    return savedPosition
  },
  routes: [
    {
      path: pubPath + '/',
      name: 'home',
      redirect: { name: 'video-list' }
    },
    {
      path: pubPath + '/video-list',
      name: 'video-list',
      component: VideoList,
      meta: {
        keepAlive: true
      }
    },
    {
      path: pubPath + '/video-detail',
      name: 'video-detail',
      component: VideoDetail
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
