import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import RegisterPage from '../views/register/RegisterPage.vue';
import Create from '../views/Create.vue';
import ViewWorkout from '../views/ViewWorkout.vue';
import { supabase } from '../supabase/init';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      auth: false,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login',
      auth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: {
      title: 'Register',
      auth: false,
    },
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
    meta: {
      title: 'Create',
      auth: true,
    },
  },
  {
    path: '/view-workout/:workoutId',
    name: 'View-Workout',
    component: ViewWorkout,
    meta: {
      title: 'View Workout',
      auth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Change document titles
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Active Tracker`;
  next();
});

// Route guard for auth routes
router.beforeEach((to, from, next) => {
  const user = supabase.auth.user();
  if (to.meta.auth) {
    if (user) {
      next();
      return;
    } else {
      next({ name: 'Login' });
    }
  }
  next();
});

export default router;
