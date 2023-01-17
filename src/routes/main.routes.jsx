import State from "../learning/State";
import Effect from '../learning/UseEffect';
import Home from '../pages/Home';
import Dashboard from "../pages/dashbord";
import SignOut from "../components/atoms/SignOut";
import {LinkedInCallback} from 'react-linkedin-login-oauth2';
export const main=[
    {
        path:'/linkedin',
        component:LinkedInCallback

    },
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
    },
    {
        path:'/signOut',
        component:SignOut
    },
]