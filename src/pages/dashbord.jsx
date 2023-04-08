import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import api from "../components/conf/axios";
import Header from "../components/molecules/Header";
import Footer from "../components/molecules/footer";
import "./info.css"
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
    const[profile,setProfile]=useState(true);
    const changeProfile=()=>
    {
        setProfile(true);
    }
    useEffect(()=>{
        if(localStorage.getItem("id")===null)
    {
      history('/');
    }
    else{
    const data={
        id:localStorage.getItem("id")
    }
    setProfile(true);
    api.post("/user",data).then((res)=>
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

    return (<>
    <div>
        {loading?<HashLoader
          color={"#F37A24"}
          loading={loading}
          size={50}
          cssOverride={override}
        />:
        <>
        <Header name={userdata.name} profile={profile} changeProfile={changeProfile} email={userdata.email} page="Home_page"/>
        <div className="content" style={{width:"100%", height:"500px"}} onClick={()=>
        {
            setProfile(false);
        }}>
            <header class="masthead" style={{postion:"absolute"}}>
            <div class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
                <div class="d-flex justify-content-center">
                    <div class="text-center">
                        <h1 class="mx-auto my-0 text-uppercase">Evaluate</h1>
                        <h2 class="text-white-50 mx-auto mt-2 mb-5">Subjective Answer Evaluation using AI.</h2>
                        <Link class="btn btn-primary" to="/about">Get Started</Link>
                    </div>
                </div>
            </div>
        </header>
        <Footer/>
        </div>

        </>}
     </div>
    </>)

}
export default Dashboard;