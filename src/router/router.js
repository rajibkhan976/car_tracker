import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import HomePage from '../components/HomePage'
import ManagerLogin from '../components/dashboard_manager/ManagerLogin'
import ManagerDashboard from '../components/dashboard_manager/ManagerDashboard'
import OperatorLogin from '../components/dashboard_operator/OperatorLogin'
import OperatorDashboard from '../components/dashboard_operator/OperatorDashboard.vue'
import CityList from '../components/dashboard_manager/modules/city/CityList'
import TrackMe from '../components/dashboard_operator/TrackMe.vue'
import TrackCars from '../components/dashboard_manager/modules/tracking/TrackCars'
import CarList from '../components/dashboard_manager/modules/car/CarList'
import UserList from '../components/dashboard_manager/modules/user/UserList'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: HomePage
        },
        {
            path: "/manager-login",
            name: "manager-login",
            component: ManagerLogin
        },
        {
            path: "/operator-login",
            name: "operator-login",
            component: OperatorLogin
        },
        {
            path: "/manager-dashboard",
            name: "manager-dashboard",
            component: ManagerDashboard
        },
        {
            path: "/operator-dashboard",
            name: "operator-dashboard",
            component: OperatorDashboard,
        },
        {
            path: "/city-list",
            name: "city-list",
            component: CityList
        },
        {
            path: "/navigation",
            name: "navigation",
            component: TrackMe
        },
        {
            path: "/tracking",
            name: "tracking",
            component: TrackCars
        },
        {
            path: "/car-list",
            name: "car-list",
            component: CarList
        },
        {
            path: "/user-list",
            name: "user-list",
            component: UserList
        },
    ]
});

export default router;

function isAuthenticated() {
    if (sessionStorage.getItem('current_manager') &&
        store?.state?.user?.loggedInManagers?.includes(sessionStorage.getItem('current_manager')) ||
        sessionStorage.getItem('current_operator') &&
        store?.state?.user?.loggedInOperators?.includes(sessionStorage.getItem('current_operator'))
    ) {
        return true;
    }
    return false;
}

router.beforeEach((to, from, next) => {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (to.name == "home" ||
        to.name === "manager-login" ||
        to.name === "operator-login" 
    ) {
        next();
    } else {
        if (isAuthenticated()) {
            next();
        } else {
            next({ path: "/" });
        }
    }
    next();
});