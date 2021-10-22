import Axios from 'axios'

export default {
    state: {
        items: [],
        data: null
    },
    getters: {
        User(state) {
            return state.data;
        },
        Items(state) {
            return state.items;
        }
    },
    mutations: {
        setUserData(state, payload) {
            return state.data = payload;
        },
        setItemsData(state, payload) {
            return state.items = payload;
        }
    },
    actions: {
        fetchUserData: async function ({ commit }) {
            await Axios
                .get("api/auth/init")
                .then((res) => {
                    commit("setUserData", res.data.user)
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        fetchItemsData: async function ({ commit }) {
            await Axios
                .get("api/items")
                .then((res) => {
                    commit("setItemsData", res.data)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
}