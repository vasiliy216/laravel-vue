import VueRouter from 'vue-router'
import App from './components/App.vue'
import Home from './components/Home.vue'

let routes = [
    { path: '/home', component: Home }
];

export default new VueRouter({routes})