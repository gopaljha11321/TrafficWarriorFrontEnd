import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import BeatLoader from "react-spinners/BeatLoader";
import api from "../components/conf/axios";
import Header from "../components/molecules/Header";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useRef } from "react";
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
  const [userData, setUserData] = useState({});
  const [profile, setProfile] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [questionCode, setQuestionsCode] = useState(0);
  const [status, setStatus] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [evaluateAnswer, setEvaluateAnswer] = useState("");
  const [scoreLoader, setScoreLoader] = useState(false);
  const [score, setScore] = useState("");

  const answer = useRef();
  const selectQuestion = useRef();

  const options = questions.map((option) => {
    const firstLetter = option.label[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });
  const throttling = () => {
    if (status === true) {
      setStatus(false);
      setTimeout(() => {
        setStatus(true);
        let inputAnswer = answer.current.value;
        setEvaluateAnswer(inputAnswer);
      }, 1000);
    }
  };
  const handleOnChange = (evt) => {
    setScore("");
    setEvaluateAnswer("");
    const temp = evt.target.innerHTML;
    let code = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].label === temp) {
        setQuestionsCode(questions[i].code);
        code = questions[i].code;
      }
    }
    if (code > 0) {
      answer.current.disabled = false;
      api.get(`/average?data=${code}`).then((res) => {
        console.log(res);
      });
    }
  };
  const changeProfile = () => {
    setProfile(true);
  };

  const onEvaluate = () => {
    setScoreLoader(true);
    const data = {
      code: questionCode,
      answer: answer.current.value,
    };
    api.post("/evaluate", data).then((res) => {
      setScore(res.data);
      setScoreLoader(false);
    });
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
          setUserData(res.data);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
          setLoading(true);
        }
      });
    }
    api.get("/questions").then((res) => {
      setQuestions(res.data);
    });
  }, []);

  useEffect(() => {
    // answer.current.value = evaluateAnswer;
    // answer.current?.value = evaluateAnswer;
  }, [score]);

  useEffect(() => {
    if (!evaluateAnswer) {
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
  }, [evaluateAnswer]);
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
            name={userData.name}
            page="Report_page"
            profile={profile}
            changeProfile={changeProfile}
            email={userData.email}
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
                maxWidth: "500px",
                minHeight: "300px",
                margin: "5%",
                height: "auto",
                position: "absolute",
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {scoreLoader ? (
                <BeatLoader />
              ) : (
                <>
                  <Autocomplete
                    id="grouped-demo"
                    ref={selectQuestion}
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
                    onChange={handleOnChange}
                  />
                  <br />
                  <textarea
                    ref={answer}
                    id="userInput"
                    name="Answer"
                    rows="4"
                    cols="50"
                    disabled={true}
                    onChange={throttling}
                    placeholder="Enter your Answer"
                    style={{ textAlign: "center", paddingTop: "5px" }}
                  ></textarea>
                  <br />
                  {score && (
                    <div
                      className="score"
                      style={{
                        width: "100%",
                        marginBottom: "10px",
                        paddingLeft: "22px",
                      }}
                    >
                      {score}
                    </div>
                  )}
                  <Button
                    disabled={buttonStatus}
                    onClick={onEvaluate}
                    variant="contained"
                  >
                    Evaluate
                  </Button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Evaluate;
