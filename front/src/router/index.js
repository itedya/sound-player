import Vue from 'vue';
import VueRouter from 'vue-router';
import { store } from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Strona główna',
    component: () => import('../views/Home.vue'),
    meta: {
      loggedIn: false,
    },
  },
  {
    path: '/app',
    name: 'Dashboard',
    component: () => import('../views/App/Dashboard.vue'),
    meta: {
      loggedIn: true,
    },
  },
  {
    path: '/auth/logout',
    name: 'Wyloguj',
    component: () => import('../views/App/Logout.vue'),
    meta: {
      loggedIn: true
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

const startPromise = new Promise(r => {
  router.start = r;
});

router.beforeEach(async (to, from, next) => {
  await startPromise;
  const authenticated = !! store.auth.state.user;

  if (to.meta.loggedIn && to.meta.loggedIn !== authenticated) {
    next('/');
  } else if (!to.meta.loggedIn && to.meta.loggedIn !== authenticated) {
    next('/app');
  } else {
    next();
  }

});

export default router;
