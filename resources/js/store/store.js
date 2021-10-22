import Vue from 'vue'
import Vuex from 'Vuex'

import action from './modules/action'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        action,
    },
})