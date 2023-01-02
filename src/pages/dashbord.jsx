import axios from "axios";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import Header from "../components/molecules/Header";
const override = {
    display: "flex",
    margin: "auto auto",
    height: "750px",
    borderColor: "red",
  };

const Dashboard=()=>
{
    const [loading, setLoading] = useState(true);
    const[userdata,setUserdata]=useState({});
    useEffect(()=>{
        document.title="home";
    const data={
        id:localStorage.getItem("id")
    }
    axios.post("http://localhost:3001/user",data).then((res)=>
    {
        setUserdata(res.data);
        setTimeout(()=>{
            setLoading(false);  
        },3000)
        setLoading(true);
    })
    },[])

    return (<>
    <div>
        {loading?<HashLoader
          color={"#F37A24"}
          loading={loading}
          size={50}
          cssOverride={override}
        />:<Header name={userdata.name}/>}
     </div>
    </>)

}
export default Dashboard;