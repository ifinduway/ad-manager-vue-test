import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Auth/Login.vue';
import Registration from '../components/Auth/Registration.vue';
import Orders from '../components/Orders.vue';
import NewAd from '../components/Ads/NewAd.vue';
import MyAds from '../components/Ads/MyAds.vue';
import Home from '../components/Home.vue';
import Ad from '../components/Ads/Ad.vue';
import AuthGuard from './auth-guard'

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/registration',
    component: Registration,
  },
  {
    path: '/orders',
    component: Orders,
    beforeEnter: AuthGuard,
  },
  {
    path: '/create',
    component: NewAd,
    beforeEnter: AuthGuard,
  },
  {
    path: '/list',
    component: MyAds,
    beforeEnter: AuthGuard,
  },
  {
    path: '/ad/:id',
    props: true,
    component: Ad,
  },
  {
    path: '/',
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
