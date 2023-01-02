import State from "../learning/State";
import Effect from '../learning/UseEffect';
import Home from '../pages/Home';
import Dashboard from "../pages/dashbord";
export const main=[
    {
        path:'/state',
        component:State
    },
    {
        path:'/effect',
        component:Effect
    },
    {
        path:'/',
        component:Home
    },
    {
        path:'/Dashboard',
        component:Dashboard
    }
]