import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import api from "../components/conf/axios";
import Header from "../components/molecules/Header";
// import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
const override = {
  display: "flex",
  margin: "auto auto",
  height: "750px",
  borderColor: "red",
};
const Evaluate = () => {
  document.title = "Evaluate";
  const history = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userdata, setUserdata] = useState({});
  const [profile, setProfile] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [questionCode, setQuestionsCode] = useState(0);
  const options = questions.map((option) => {
    const firstLetter = option.label[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });
  const handleOncChange = (evt) => {
    const temp = evt.target.innerHTML;
    let code = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].label === temp) {
        setQuestionsCode(questions[i].code);
        code = questions[i].code;
      }
    }
    if (code > 0) {
      api.get(`/average?data=${code}`).then((res) => {
        console.log(res);
      });
    }
  };
  const changeProfile = () => {
    setProfile(true);
  };

  useEffect(() => {
    if (sessionStorage.getItem("id") === null) {
      history("/");
    } else {
      const data = {
        id: sessionStorage.getItem("id"),
      };
      setProfile(true);
      api.post("/user", data).then((res) => {
        if (res.data?.msg === "wrong id") {
          sessionStorage.clear();
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
  useEffect(() => {
    api.get("/questions").then((res) => {
      setQuestions(res.data);
    });
  }, []);
  return (
    <>
      {loading ? (
        <HashLoader
          color={"grey"}
          loading={loading}
          size={50}
          cssOverride={override}
        />
      ) : (
        <>
          <Header
            name={userdata.name}
            page="Report_page"
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
          ></div>
          <div
            style={{
              position: "absolute",
              top: "56px",
              width: "100%",
              backgroundImage: "linear-gradient(to right, grey 80%, black )",
              flexDirection: "column",
              alignItems: "center",
              display: "flex",
              height: "auto",
              minHeight: "94%",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                width: "90%",
                margin: "5%",
                height: "80%",
                position: "absolute",
                padding: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Autocomplete
                id="grouped-demo"
                options={options.sort(
                  (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                )}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) =>
                  option.code === value.code
                }
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Select question" />
                )}
                onChange={handleOncChange}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Evaluate;
