const state = () => ({
    cars: [ 
        {
            id: "c1",
            city_id: 'test1',
            operator_id: 'test11',
            position: { lat: 35.6804, lng: 139.7690 },
            tooltip: "Car1",
            draggable: false,
            visible: true,
        },
        {
            id: "c2",
            city_id: 'test2',
            operator_id: 'test12',
            position: { lat: 35.2104, lng: 138.6590 },
            tooltip: "Car2",
            draggable: false,
            visible: true,
        },
        {
            id: "c3",
            city_id: 'test3',
            operator_id: 'test13',
            position: { lat: 35.3204, lng: 137.5690 },
            tooltip: "Car3",
            draggable: false,
            visible: true,
        },
        {
            id: "c4",
            city_id: 'test4',
            operator_id: 'test14',
            position: { lat: 35.4304, lng: 136.4680 },
            tooltip: "Car4",
            draggable: false,
            visible: true,
        },
        {
            id: "c5",
            city_id: 'test5',
            operator_id: 'test15',
            position: { lat: 35.5404, lng: 135.3990 },
            tooltip: "Car5",
            draggable: false,
            visible: true,
        },
        {
            id: "c6",
            city_id: 'test6',
            operator_id: 'test16',
            position: { lat: 35.6504, lng: 134.2790 },
            tooltip: "Car6",
            draggable: false,
            visible: true,
        },
        {
            id: "c7",
            city_id: 'test7',
            operator_id: 'test17',
            position: { lat: 35.7604, lng: 135.8630 },
            tooltip: "Car7",
            draggable: false,
            visible: true,
        },
        {
            id: "c8",
            city_id: 'test8',
            operator_id: 'test18',
            position: { lat: 35.8704, lng: 136.1690 },
            tooltip: "Car8",
            draggable: false,
            visible: true,
        },
    ],
});

// getters
const getters = {};

const actions = {
};

const mutations = {
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};