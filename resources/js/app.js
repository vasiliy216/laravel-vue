import Vue from 'vue'
import VueRouter from 'vue-router'

import { Input, Button, DatePicker, Avatar, Dropdown, Icon, Menu, Form, Popover, Pagination } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';

Vue.use(DatePicker);
Vue.use(Avatar)
Vue.use(Input);
Vue.use(Button);
Vue.use(Dropdown);
Vue.use(Icon);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Popover);
Vue.use(Pagination);

Vue.use(VueRouter);

import store from './store/store'

import App from './components/App'
import Register from './components/section/Auth/Register.vue'
import Login from './components/section/Auth/Login.vue'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: App,
            beforeEnter: (to, from, next) => {
                if (!store.getters.IsAuth) next({ name: 'login' })
                else next()
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        }
    ],
});

const app = new Vue({
    el: '#app',
    components: { App },
    router,
    store
});