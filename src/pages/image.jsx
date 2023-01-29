import Header from "../components/molecules/Header";
import {useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
import env from "../components/conf/env"
const override = {
    display: "flex",
    margin: "auto auto",
    height: "750px",
    borderColor: "red",
  };
const Image=()=>
{
    document.title="Images";
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
          <div>
        <Header name={userdata.name}profile={profile} changeProfile={changeProfile} email={userdata.email} page="Image_page"/>
        <div className="content" style={{width:"100%", height:"500px"}} onClick={()=>
        {
            setProfile(false);
        }}></div>
        <div style={{ justifyContent:"center",display:"flex"}}>
        <h3 className="card" style={{width: "18rem",position:"relative",margin:"50px",top:"-500px"}}>
  <img src="https://gumlet.assettype.com/dtnext%2Fimport%2FArticles%2F2021%2FAug%2F202108240238092917_Petition-for-zebra-crossing-near-Central-station-subway_SECVPF.gif?auto=format%2Ccompress&fit=max&w=1200" className="card-img-top" alt="..."/>
  <div className="card-body">
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  </h3>

  <h3 className="card" style={{width: "18rem",top:"-500px",margin:"50px"}}>
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnXTdll-ZeszXU2H8L7wajPbxsmkSSSsYtFXFEtUePr0WgiSHcsAnZVqQ6xSv7hFszByY&usqp=CAU" className="card-img-top" alt="..."/>
  <div className="card-body">
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</h3>

<h3 className="card" style={{width: "18rem",top:"-500px",margin:"50px"}}>
  <img src="https://static.toiimg.com/photo/msid-72101016/72101016.jpg" className="card-img-top" alt="..."/>
  <div className="card-body">
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</h3>

        </div></div>}

        </>
    );
}
export default Image;