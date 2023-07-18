import { createWebHistory, createRouter } from "vue-router";
import LoginPage from "./components/loginPage.vue";
import signUp from "./components/signUp.vue";
// import Header from "./components/common-component/HeaderPage.vue";
import Home from "./components/homePage.vue";
import Admins from "./components/usersTable.vue";
import Quiz from "./components/quizPage.vue";
import Profile from "./components/profilePage.vue";
import notAccessable from "./components/notAccessable.vue";
import StartQuiz from "./components/attemptQuiz.vue";
import quizTable from "./components/quizTable.vue";
import userProfile from "./components/userProfile.vue";
import editQuiz from "./components/editQuiz.vue";

const routes = [
  {
    name: "login",
    path: "/login",
    component: LoginPage,
    meta: { requiresAuth: false, requiresAdmin: false },
  },
  {
    name: "signup",
    path: "/signup",
    component: signUp,
    meta: { requiresAuth: false, requiresAdmin: false },
  },
  {
    path: "/",
    name: "home",
    components: {
      default: Home,
      // header: Header,
    },
    meta: { requiresAuth: false, requiresAdmin: false },
  },
  {
    path: "/admin",
    components: {
      default: Admins,
      // header: Header,
    },
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/quiz",
    name: "Quiz",
    components: {
      default: Quiz,
      // header: Header,
    },
    meta: { requiresAuth: false, requiresAdmin: false },
  },
  {
    path: "/profile",
    components: {
      default: Profile,
      // header: Header,
    },
    meta: { requiresAuth: false, requiresAdmin: false },
  },
  {
    path: "/start-quiz/:id",
    components: {
      default: StartQuiz,
      // header: Header,
    },
    props: true,
    meta: { requiresAuth: false, requiresAdmin: false },
  },
  {
    path: "/quiz-table",
    components: {
      default: quizTable,
      // header: Header,
    },
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/userprofile/:id",
    components: {
      default: userProfile,
      // header: Header,
    },
    props: true,
    meta: { requiresAuth: true, requiresAdmin: false },
  },
  {
    path: "/editquiz/:id",
    components: {
      default: editQuiz,
      // header: Header,
    },
    props: true,
    meta: { requiresAuth: true, requiresAdmin: false },
  },
  {
    name: "notAccessable",
    path: "/notAccessable",
    component: notAccessable,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn =
    localStorage.getItem("isAdmin") && localStorage.getItem("user") !== null;
  const requiresAdmin = to.meta.requiresAdmin;
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!isLoggedIn && to.name !== 'login' && to.name !== 'signup') {
    next('/login');
  } else if (requiresAdmin && !isAdmin) {
    next('/notAccessable');
  } else {
    next();
  }
});

export default router;
