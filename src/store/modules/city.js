const state = () => ({
    citiy_list: [ 
        {
            id: 1,
            name: 'test',
            region: 'test',
            country: 'test'
        },
        {
            id: 2,
            name: 'test',
            region: 'test',
            country: 'test'
        },
        {
            id: 3,
            name: 'test',
            region: 'test',
            country: 'test'
        },
        {
            id: 4,
            name: 'test',
            region: 'test',
            country: 'test'
        },
        {
            id: 5,
            name: 'test',
            region: 'test',
            country: 'test'
        },
        {
            id: 6,
            name: 'test',
            region: 'test',
            country: 'test'
        },
        {
            id: 7,
            name: 'test',
            region: 'test',
            country: 'test'
        },
        {
            id: 8,
            name: 'test',
            region: 'test',
            country: 'test'
        },
        {
            id: 9,
            name: 'test',
            region: 'test',
            country: 'test'
        },
        {
            id: 10,
            name: 'test',
            region: 'test',
            country: 'test'
        },
        {
            id: 11,
            name: 'test',
            region: 'test',
            country: 'test'
        },
        {
            id: 12,
            name: 'test',
            region: 'test',
            country: 'test'
        },
        {
            id: 13,
            name: 'test',
            region: 'test',
            country: 'test'
        },
        {
            id: 14,
            name: 'test',
            region: 'test',
            country: 'test'
        },
        {
            id: 15,
            name: 'test',
            region: 'test',
            country: 'test'
        },
    ],
    car_list: [
        {
            id: 'test1',
            name: 'test1'
        },
        {
            id: 'test2',
            name: 'test2'
        },
        {
            id: 'test3',
            name: 'test3'
        },
        {
            id: 'test4',
            name: 'test4'
        },
        {
            id: 'test5',
            name: 'test5'
        },
    ],
    operator_list: [
        {
            id: 'test1',
            name: 'test1'
        },
        {
            id: 'test2',
            name: 'test2'
        },
        {
            id: 'test3',
            name: 'test3'
        },
        {
            id: 'test4',
            name: 'test4'
        },
        {
            id: 'test5',
            name: 'test5'
        },
    ],
    assignedCars: [],
    updateCity: null
});

// getters
const getters = {};

const actions = {
    addCities(context, cities) {
        context.commit('addCities', cities);
    },
    setIndex(context, index) {
        context.commit('setIndex', index);
    },
    updateCity(context, city) {
        context.commit('updateCity', city);
    },
    removeCity(context, id) {
        context.commit('removeCity', id);
    },
    assignCar(context, car) {
        context.commit('assignCar', car);
    }
};

const mutations = {
    addCities(state, cities) {
        if (cities) {
            state.citiy_list.push(cities);
        }
    },
    setIndex(state, index) {
        state.updateCity = index;
    },
    updateCity(state, city) {
        if (city) {
            state.citiy_list.splice(state.updateCity, 1, city);
        } 
    },
    removeCity(state, id) {
        if (id) {
            state.citiy_list.splice(id, 1);
        }
    },
    assignCar(state, car) {
        if (car) {
            state.assignedCars.push(car);
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