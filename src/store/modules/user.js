const state = () => ({
    managers: [ 
        { 
            email: 'admin@toyota.com', 
            password: '12345678'
        } 
    ],
    operators: [ 
        { 
            id: "c1",
            city_id: 'test1',
            operator_id: 'test11',
            position: { lat: 35.6804, lng: 139.7690 },
            tooltip: "Car1",
            draggable: false,
            visible: true,
            code: '123456'
        } 
    ],
    user_list: [
        {
            id: 'test1',
            name: 'test1',
            role: 'operator',
            phone: '12345678'
        },{
            id: 'test2',
            name: 'test1',
            role: 'manager',
            phone: '12345678'
        },{
            id: 'test3',
            name: 'test1',
            role: 'operator',
            phone: '12345678'
        },{
            id: 'test4',
            name: 'test1',
            role: 'operator',
            phone: '12345678'
        },{
            id: 'test5',
            name: 'test1',
            role: 'operator',
            phone: '12345678'
        },{
            id: 'test6',
            name: 'test1',
            role: 'manager',
            phone: '12345678'
        },{
            id: 'test7',
            name: 'test1',
            role: 'operator',
            phone: '12345678'
        },{
            id: 'test8',
            name: 'test1',
            role: 'operator',
            phone: '12345678'
        },{
            id: 'test9',
            name: 'test1',
            role: 'manager',
            phone: '12345678'
        },{
            id: 'test10',
            name: 'test1',
            role: 'operator',
            phone: '12345678'
        },
    ],
    operator_report: [
        {
            id: 'test1',
            name: 'test1',
            hours_worked: '8 H',
            extra_work: '1 H',
            wage: '10 USD/H',
            extra_wage: '15 USD/H',
            date: '2022-02-01',
        },
        {
            id: 'test2',
            name: 'test2',
            hours_worked: '8 H',
            extra_work: 'O H',
            wage: '10 USD/H',
            extra_wage: '15 USD/H',
            date: '2022-02-01',
        },
        {
            id: 'test3',
            name: 'test3',
            hours_worked: '8 H',
            extra_work: '2 H',
            wage: '10 USD/H',
            extra_wage: '15 USD/H',
            date: '2022-02-01',
        },
        {
            id: 'test4',
            name: 'test4',
            hours_worked: '8 H',
            extra_work: 'O H',
            wage: '10 USD/H',
            extra_wage: '15 USD/H',
            date: '2022-02-01',
        },
        {
            id: 'test5',
            name: 'test5',
            hours_worked: '8 H',
            extra_work: 'O H',
            wage: '10 USD/H',
            extra_wage: '15 USD/H',
            date: '2022-02-15',
        },
    ],
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