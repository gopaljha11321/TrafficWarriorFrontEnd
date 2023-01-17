import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const Header = (props) => {
  const history = useNavigate();
  useEffect(()=>
  {
    if(props?.page)
    {
      const data=document.getElementById(props.page);
      data.style.fontWeight="700";
      data.style.cursor="auto";
      data.style.color="purple"
    }
  })
  return (  <nav  className="navbar navbar-expand-lg navbar-light" style={{backgroundImage:"linear-gradient(90deg,skyblue 80%,purple )"}}>
  <a className="navbar-brand " style={{color:"white"}} href="#">{props.name}</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <div className="nav-link" id="Home_page" style={{cursor:"pointer",color:"White"}} >Home <span className="sr-only">(current)</span></div>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" style={{cursor:"pointer",color:"White"}} >About <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" style={{cursor:"pointer",color:"White"}} >Images <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" style={{cursor:"pointer",color:"White"}} >Report <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" to="/signOut" style={{cursor:"pointer",color:"White"}} >Sign Out <span className="sr-only">(current)</span></Link>
      </li>
    </ul>
    <img src="student.png" alt="" width="30px" />
  </div>
</nav>

  );
};
export default Header;
