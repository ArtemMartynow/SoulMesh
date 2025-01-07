import { createRouter, createWebHistory } from "vue-router";
import HomePage from './routes/home-page';
import SignUp from './routes/sign-up';
import Login from './routes/login';
import Profile from './routes/profile';
import AppHomePage from './routes/app-home-page';
import Faq from './routes/faq';
import EditProfile from './routes/edit-profile';
import Security from "./routes/security";
import Search from './routes/search';
import userProfile from "./routes/user-profile";
import errorPage from './routes/error-page';
import MyFriends from "./routes/my-friends";
import receivedRequests from "./routes/received-requests";
import sentRequests from "./routes/sent-requests";
import Chat from "./routes/chat";

const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: () => import('../components/containers/LandingContainer.vue'),
        children: [
          HomePage,
          Faq
        ]
      },
      {
        path: '/auth',
        component: () => import('../components/containers/AuthContainer.vue'),
        children: [
          SignUp,
          Login,
        ]
      },
      {
        path: '/profile',
        component: () => import('../components/containers/AppContainer.vue'),
        children: [
          Profile,
          AppHomePage,
          userProfile,
          Search,
          {
            path: '/settings',
            component: () => import('../components/containers/SettingsContainer.vue'),
            children: [
              EditProfile,
              Security
            ]
          },
          {
            path: '/chat',
            component: () => import('../components/containers/ChatContainer.vue'),
            children: [
              Chat
            ]
          },
          {
            path: '/friendship',
            component: () => import('../components/containers/FriendshipContainer.vue'),
            children: [
              MyFriends,
              receivedRequests,
              sentRequests
            ]
          },
        ]
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('../pages/extra-pages/ErrorPage.vue'),
        children: [
          errorPage
        ]
      },
    ]
})

router.beforeResolve((to, from, next) => {
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0)
  }

  const middleware = to.meta.middleware
  if (!middleware || !middleware.length) {
    return next()
  }

  const context = {
    to,
    from,
    next
  }

  for (var key in middleware) {
    middleware[key]({
      ...context
    })
  }
})

export default router