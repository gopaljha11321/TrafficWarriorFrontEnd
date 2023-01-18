import { useEffect, useState } from "react";
import './header.css'
import { Link, useNavigate } from "react-router-dom";
const Header = (props) => {
  const history = useNavigate();
  const [profile,setProfile]=useState(false);
  const signOut=()=>
  {
    history('/Signout')
  }
  useEffect(()=>
  {
    if(props?.page)
    {
      const data=document.getElementById(props.page);
      data.style.fontWeight="700";
      data.style.cursor="auto";
      data.style.color="black"
    }
    if(profile===true)
    {
      setProfile(props.profile);
      const data=document.getElementById('state');
      data.style.opacity=1;
      props.changeProfile();
    }
  })
  const profile1=()=>{
    setProfile(true);
    const data=document.getElementById('state');
    data.style.opacity=1;
  }
  return ( 
    <>
    {profile?<>
    <div id="container1">
      <div className="image" align="center"style={{fontFamily:"arial,sans-serif",fontWeight:"700",color:"black",width:"100%",height:"100%"}}><img src="user_icon.webp" width="200px" style={{clipPath:"circle(40%)"}} alt="user_image"/>
      <div style={{fontWeight:"700",color:"black"}}>{props.name}</div>
      <div style={{borderBottom:"1px  solid grey", paddingBottom:"50px",fontWeight:"500",color:"grey"}}>{props.email}</div>
      <div className="button" style={{marginTop:"25px"}}><button type="submit" style={{border:"1px grey solid", borderRadius:"10px", width:"100px", height:"40px",fontWeight:"500",cursor:"pointer"}} className="btn1" onClick={signOut}>Sign out</button></div>
      </div>
      
    </div>
    </>    
    :""}
    <div id="state" style={{
    zIndex:"1"
    }}>
     <nav  className="navbar navbar-expand-lg navbar-light" style={{backgroundImage:"linear-gradient(90deg,skyblue 80%,purple )",zIndex:"100"}}>
  <a className="navbar-brand " style={{color:"white"}} href="#">{props.name}</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/home" id="Home_page" style={{cursor:"pointer",color:"White"}} >Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" id="Image_page" to="/image" style={{cursor:"pointer",color:"White"}} >Images <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to="/report" id="Report_page" style={{cursor:"pointer",color:"White"}} >Report <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to="/about" id="About_page" style={{cursor:"pointer",color:"White"}} >About <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to="/signOut" style={{cursor:"pointer",color:"White"}} >Sign Out <span className="sr-only">(current)</span></Link>
      </li>
    </ul>
    <img src="user_icon.webp" alt="user image" style={{clipPath:"circle(40%)", cursor:"pointer"}} onClick={profile1} width="50px" />
  </div>
</nav>
</div>
</>
);
};
export default Header;
