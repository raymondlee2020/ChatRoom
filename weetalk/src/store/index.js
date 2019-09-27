import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const vuex = new Vuex.Store({
    state: {
        isConnect: 'Unconnected',
        userName: ''
    },
    getters: {
        // checkLog: state => state.isLogin
    },
    mutations: {
        connect(state) {
            state.isConnect = 'Connected';
        },
        login(state, name) {
            state.userName = name;
        }
    }
});

export default vuex;