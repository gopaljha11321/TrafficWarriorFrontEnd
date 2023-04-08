import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import api from "../components/conf/axios";
import Header from "../components/molecules/Header";
import Info from "../components/molecules/Info";
import Footer from "../components/molecules/footer"
const override = {
  display: "flex",
  margin: "auto auto",
  height: "750px",
  borderColor: "red",
};
const About = () => {
  document.title = "About";
  const history = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userdata, setUserdata] = useState({});
  const [profile, setProfile] = useState(true);
  const changeProfile = () => {
    setProfile(true);
  };
  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      history("/");
    } else {
      const data = {
        id: localStorage.getItem("id"),
      };
      setProfile(true);
      api.post("/user", data).then((res) => {
        if (res.data?.msg === "wrong id") {
          localStorage.clear();
          history("/");
        } else {
          setUserdata(res.data);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
          setLoading(true);
        }
      });
    }
  }, []);
  return (
    <>
      {" "}
      {loading ? (
        <HashLoader
          color={"#F37A24"}
          loading={loading}
          size={50}
          cssOverride={override}
        />
      ) : (
        <>
        <Header
          name={userdata.name}
          page="About_page"
          profile={profile}
          changeProfile={changeProfile}
          email={userdata.email}
        />
         <div
        className="content"
        style={{ width: "100%", height: "500px" }}
        onClick={() => {
          setProfile(false);
        }}
      >      <div className="body" style={{position:"absolute",display:"block",top:"50px",width:"100%"}}><Info/><Footer/></div></div>
        </>
      )}
    </>
  );
};
export default About;
