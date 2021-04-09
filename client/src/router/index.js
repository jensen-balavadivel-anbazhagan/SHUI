import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Streams from '../views/Streams.vue'
import AddStream from '../views/AddStream.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/streams',
    name: 'Streams',
    component: Streams,
    meta: { requiresAuth: true },
  },
  {
    path: '/addstream',
    name: 'AddStream',
    component: AddStream,
    meta: { requiresAuth: true },
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("token");
  console.log("token" + token);
  if (to.matched.some((route) => route.meta.requiresAuth && !token)) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router
