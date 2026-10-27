import { createRouter, createWebHistory } from 'vue-router'
import Todos from '../views/Todos.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/todos' },
    { path: '/todos', name: 'todos', component: Todos },
    { path: '/about', name: 'about', component: About },
    { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFound }
  ]
})

export default router