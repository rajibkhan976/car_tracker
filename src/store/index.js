import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import city from './modules/city'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        city,
        user
    },
});

export default store;