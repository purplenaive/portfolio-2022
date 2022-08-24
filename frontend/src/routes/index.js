import { createRouter, createWebHistory } from "vue-router"

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/page/home.vue"),
    },
    {
      path: "/project",
      name: "project",
      component: () => import("@/page/projects.vue"),
    },
    {
      path: "/note",
      name: "note",
      component: () => import("@/page/notes.vue"),
    },
  ]
})