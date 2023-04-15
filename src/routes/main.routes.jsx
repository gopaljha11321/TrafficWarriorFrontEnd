import State from "../learning/State";
import Effect from '../learning/UseEffect';
import Home from '../pages/Home';
import Dashboard from "../pages/dashbord";
import SignOut from "../components/atoms/SignOut";
import {LinkedInCallback} from 'react-linkedin-login-oauth2';
import About from "../pages/about"
import Report from "../pages/report";
import Image from "../pages/image";
import Material from "../learning/Material"
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
    {
        path:"/about",
        component:About
    },
    {
        path:'/report',
        component:Report
    },
    {
        path:"/questions",
        component:Image
    },
    {
        path:"/materialUI",
        component:Material
    }
]