import Vue from 'vue'
import VueRouter from 'vue-router'

import { Input, Button, DatePicker, Avatar, Dropdown, Icon, Menu } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';

Vue.use(DatePicker);
Vue.use(Avatar)
Vue.use(Input);
Vue.use(Button);
Vue.use(Dropdown);
Vue.use(Icon);
Vue.use(Menu);

Vue.use(VueRouter);


import App from './components/App'
import Hello from './components/Hello'
import Home from './components/Home'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/hello',
            name: 'hello',
            component: Hello,
        },
    ],
});
const app = new Vue({
    el: '#app',
    components: { App },
    router,
});