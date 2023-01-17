import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import Header from "../components/molecules/Header";
import env from "../conf/env";
const override = {
    display: "flex",
    margin: "auto auto",
    height: "750px",
    borderColor: "red",
  };

const Dashboard=()=>
{
    document.title="home";
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
        },3000)
        setLoading(true);
    }
    })
}
    },[])

    return (<>
    <div>
        {loading?<HashLoader
          color={"#F37A24"}
          loading={loading}
          size={50}
          cssOverride={override}
        />:<Header name={userdata.name} page="Home_page"/>}
     </div>
    </>)

}
export default Dashboard;