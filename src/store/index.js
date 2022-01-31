import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import city from './modules/city'
import car from './modules/car'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        car,
        city,
        user,
    },
});

export default store;