import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
const SignOut=()=>{
    const history = useNavigate();
    useEffect(()=>
    {
        sessionStorage.clear();
        history('/');

    })
    return("<></>"); 
}
export default SignOut;