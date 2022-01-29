const state = () => ({
    managers: [ { email: 'admin@volvo.com', password: '12345678'} ],
    operators: [ { code: '123456' } ],
    loggedInManagers: [],
    loggedInOperators: []
});

// getters
const getters = {};

const actions = {
    loginAsManager(context, credential) {
        context.commit('loginAsManager', credential);
    },
    loginAsOperator(context, code) {
        context.commit('loginAsOperator', code);
    },
    logOut(context) {
        context.commit('logOut');
    }
};

const mutations = {
    loginAsManager(state, credential) {
        var isAuthenticated = state.managers.some(function(element) {
            return element.email === credential.email && element.password === credential.password;
        });
        if (isAuthenticated && !state.loggedInManagers.includes(credential.email)) {
            state.loggedInManagers.push(credential.email);
        }
    },
    loginAsOperator(state, code) {
        var isAuthenticated = state.operators.some(element => element.code === code);
        if (isAuthenticated && !state.loggedInOperators.includes(code)) {
            state.loggedInOperators.push(code);
        }
    },
    logOut(state) {
        if (sessionStorage.getItem('current_manager')) {
            state.loggedInManagers.filter(element => element !== sessionStorage.getItem('current_manager'));
        }
        if (sessionStorage.getItem('current_operator')) {
            state.loggedInOperators.filter(element => element !== sessionStorage.getItem('current_operator'));
        }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};