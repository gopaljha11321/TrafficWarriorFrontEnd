import Header from "../components/molecules/Header";
import {useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
import env from "../conf/env";
const override = {
    display: "flex",
    margin: "auto auto",
    height: "750px",
    borderColor: "red",
  };
const Report=()=>
{
    document.title="Report";
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const[userdata,setUserdata]=useState({});
    useEffect(()=>{
        if(localStorage.getItem("id")===null)
    {
      history('/');
    }
    else{
    const data={
        id:localStorage.getItem("id")
    }
    axios.post(env[process.env.NODE_ENV]?.appServer+"user",data).then((res)=>
    {
        if(res.data?.msg==="wrong id")
        {
            localStorage.clear();
            history('/');
        }
        else{
        setUserdata(res.data);
        setTimeout(()=>{
            setLoading(false);  
        },1000)
        setLoading(true);
    }
    })
}
    },[])
    return(
        <> {loading?<HashLoader
            color={"#F37A24"}
            loading={loading}
            size={50}
            cssOverride={override}
          />:
        <Header name={userdata.name} page="Report_page"/>}
        </>
    );
}
export default Report;