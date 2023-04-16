import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import api from "../components/conf/axios";
import Header from "../components/molecules/Header";
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
    const[profile,setProfile]=useState(true);
    const changeProfile=()=>
    {
        setProfile(true);
    }
    useEffect(()=>{
        if(sessionStorage.getItem("id")===null)
    {
      history('/');
    }
    else{
    const data={
        id:sessionStorage.getItem("id")
    }
    setProfile(true);
    api.post("/user",data).then((res)=>
    {
        if(res.data?.msg==="wrong id")
        {
            sessionStorage.clear();
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
            color={"grey"}
            loading={loading}
            size={50}
            cssOverride={override}
          />:
        <Header name={userdata.name} page="Report_page" profile={profile} changeProfile={changeProfile} email={userdata.email}/>}
         <div className="content" style={{width:"100%", height:"500px"}} onClick={()=>
        {
            setProfile(false);
        }}></div>
        </>
    );
}
export default Report;