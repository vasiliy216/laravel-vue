import Axios from 'axios'
import orderBy from "lodash/orderBy";

export default {
    state: {
        data: null,
        items: [],
        itemsFilter: [],
        filter: false,
        isAuth: !!window.localStorage.token,
        SortType: ""
    },
    getters: {
        User(state) {
            return state.data;
        },
        Items(state) {
            return state.items;
        },
        IsAuth(state) {
            return state.isAuth;
        },
        SortType(state) {
            return state.SortType;
        },
        ItemsFilter(state) {
            return state.itemsFilter;
        },
        Filter(state) {
            return state.filter;
        }
    },
    mutations: {
        setUserData(state, payload) {
            return state.data = payload;
        },
        setItemsData(state, payload) {
            return state.items = payload;
        },
        setIsAuth(state, payload) {
            return state.isAuth = payload;
        },
        setSortType(state, payload) {
            return state.SortType = payload;
        },
        setItemsFilter(state, payload) {
            return state.itemsFilter = payload;
        },
        setFilter(state, payload) {
            return state.filter = payload;
        }
    },
    actions: {
        fetchUserData: async function ({ commit }) {
            await Axios
                .get("api/auth/init", {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.token}`
                    }
                })
                .then((res) => {
                    commit("setUserData", res.data.user)
                })
                .catch((err) => {
                    commit("setIsAuth", false);
                    console.log(err);
                });
        },
        searchItemsText: function ({commit}, value) {
            commit("setItemsFilter", value.items);
            commit("setFilter", value.boolen);
        },
        sortItemsData: function ({commit}, value) {
            const {type, items} = value;
            switch(type) {
                case "USER": commit("setItemsData", orderBy(items, ["username"], ["desc"])); break;
                case "EMAIL": commit("setItemsData", orderBy(items, ["email"], ["desc"])); break;
                case "STATUS": commit("setItemsData", orderBy(items, ["completed"], ["desc"])); break;
                default: commit("setItemsData", orderBy(items, ["created_at"], ["desc"]));
            }
            commit("setSortType", type);
        },
        fetchItemsData: async function ({ commit }) {
            await Axios
                .get("api/items", {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.token}`
                    }
                })
                .then((res) => {
                    commit("setItemsData", res.data);
                    commit("setSortType", "");
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        fetchUserLogin: function ({ commit }, postData) {
            return Axios
                .post("api/auth/login", postData)
                .then(({ data }) => {

                    window.localStorage["token"] = data.token;

                    commit("setUserData", data.user)
                    commit("setIsAuth", true)

                    // window.axios.defaults.headers.common["token"] = res.data.token;

                    return data;
                })
                .catch((err) => console.log(err));

        },
        fetchUserRegister: function ({ commit }, postData) {
            return Axios
                .post('api/auth/register', postData)
                .then( res => {
                    console.log(res);
                    if(res.status !== 200) throw new Error(res.status);
                    return res;
                })
                .catch( err => {
                    console.log(err);       
                    return err;
                })

        },
        fetchUserExit: function ({commit}) {
            return Axios
                .get('api/auth/logout', {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.token}`
                    }
                })
                .then(res => {
                    delete window.localStorage.token;
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}