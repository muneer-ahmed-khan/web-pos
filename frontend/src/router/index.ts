import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { authGuard } from "@/guards/authGuard";
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // Check if the route requires authentication
    authGuard(to, from, next); // Call your auth guard function
  } else if (!to.meta.requiresAuth && to.name !== "login") {
    // Redirect to login page if the route doesn't require authentication
    // and it's not the login page itself
    next("/login");
  } else {
    // Continue navigation for other cases
    next();
  }
});

export default router;
