import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import api from "../components/conf/axios";
import Header from "../components/molecules/Header";
import Footer from "../components/molecules/footer";
import "../components/molecules/info.css"
const override = {
    display: "flex",
    margin: "auto auto",
    height: "750px",
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

    return (<>
    <div>
        {loading?<HashLoader
          color={"grey"}
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
            <header className="masthead" style={{postion:"absolute"}}>
            <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
                <div className="d-flex justify-content-center">
                    <div className="text-center">
                        <h1 className="mx-auto my-0 text-uppercase">Evaluate</h1>
                        <h2 className="text-white-50 mx-auto mt-2 mb-5">Subjective Answer Evaluation using AI.</h2>
                        <Link className="btn btn-primary" to="/about">Get Started</Link>
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