import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import api from "../components/conf/axios";
import Header from "../components/molecules/Header";
import Footer from "../components/molecules/footer";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import { Slider, TextField, Button } from "@mui/material";
const override = {
  display: "flex",
  margin: "auto auto",
  height: "750px",
  borderColor: "red",
};
const initialValues = {
  Question: "",
  SampleAnswer: "",
  Key: "",
  Layer: 5,
  NLP: 0.5,
};
const Image = () => {
  const history = useNavigate();
  const [errorQuestion, setErrorQuestion] = useState("");
  const [errorKey, setErrorKey] = useState("");
  const [errorSampleAnswer, setErrorSampleAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [userdata, setUserdata] = useState({});
  const [profile, setProfile] = useState(true);
  const [sampleAnswer, SetSampleAnswer] = useState([]);
  const [key, setKey] = useState([]);

  const { values, setValues, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
    });

  const addSample = () => {
    if(values.SampleAnswer==="")
    {
      setErrorSampleAnswer("Enter Sample Answer")
    }
    else{
      setErrorSampleAnswer("");
    const temp = sampleAnswer;
    temp.push(values.SampleAnswer);
    SetSampleAnswer(temp);
    setValues({ ...values, SampleAnswer: "" });
    }
  };
  const addKey = () => {
    if(values.Key==="")
    {
      setErrorKey("Enter Key")
    }
    else{
    setErrorKey("")
    const temp = key;
    temp.push(values.Key);
    setKey(temp);
    setValues({ ...values, Key: "" });
    }
  };
  document.title = "Images";

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
          color={"grey"}
          loading={loading}
          size={50}
          cssOverride={override}
        />
      ) : (
        <div>
          <Header
            name={userdata.name}
            profile={profile}
            changeProfile={changeProfile}
            email={userdata.email}
            page="Questions_page"
          />
          <>
            <h3
              className="content"
              style={{ width: "100%", height: "500px" }}
              onClick={() => {
                setProfile(false);
              }}
            ></h3>
            <div
              style={{
                position: "absolute",
                top: "56px",
                border: "2px red solid",
                width: "100%",
                backgroundImage: "linear-gradient(to right, grey 80%, black )",
                flexDirection: "column",
                alignItems: "center",
                display: "flex",
                height: "auto",
                minHeight: "94%",
              }}
            >
              <Box
                width={"90%"}
                style={{
                  backgroundColor: "white",
                  margin: "5%",
                  height: "80%",
                }}
              >
                <div
                  className="heading"
                  style={{ margin: "20px 20px", textAlign: "center" }}
                >
                  Add Question
                </div>
                {!errorQuestion ? (
                  <TextField
                    id="Question"
                    label="Question"
                    variant="standard"
                    style={{ width: "90%", margin: "0 0 20px 20px" }}
                    onChange={handleChange}
                    value={values.Question}
                  />
                ) : (
                  <TextField
                    error
                    id="Question"
                    label="Question"
                    variant="standard"
                    style={{ width: "90%", margin: "0 0 20px 20px" }}
                    onChange={handleChange}
                    value={values.Question}
                    helperText={errorQuestion}
                  />
                )}

                <br />
                {!errorSampleAnswer ? (
                  <TextField
                    id="SampleAnswer"
                    label="Sample Answer"
                    variant="standard"
                    name="SampleAnswer"
                    style={{ width: "70%", margin: "0 20px 20px 20px" }}
                    onChange={handleChange}
                    value={values.SampleAnswer}
                  />
                ) : (
                  <TextField
                  error
                    id="SampleAnswer"
                    label="Sample Answer"
                    variant="standard"
                    name="SampleAnswer"
                    style={{ width: "70%", margin: "0 20px 20px 20px" }}
                    onChange={handleChange}
                    value={values.SampleAnswer}
                    helperText={errorSampleAnswer}
                  />
                )}

                <Fab color="primary" aria-label="add" size="small">
                  <AddIcon onClick={addSample} />
                </Fab>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {sampleAnswer.map((item, index) => (
                    <Paper
                      key={index}
                      elevation={3}
                      style={{
                        width: "150px",
                        height: "60px",
                        margin: "0 0 20px 20px",
                        padding: "5px 0 0 5px",
                      }}
                    >
                      {item}
                    </Paper>
                  ))}
                </div>
                {!errorKey ? (
                  <TextField
                  id="Key"
                  label="Key"
                  variant="standard"
                  style={{ width: "70%", margin: "0 20px 20px 20px" }}
                  value={values.Key}
                  onChange={handleChange}
                  />
                ) : (
                  <TextField
                  error
                  id="Key"
                  label="Key"
                  variant="standard"
                  style={{ width: "70%", margin: "0 20px 20px 20px" }}
                  value={values.Key}
                  onChange={handleChange}
                    helperText={errorKey}
                  />
                )}
                
                <Fab color="primary" aria-label="add" size="small">
                  <AddIcon onClick={addKey} />
                </Fab>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {key.map((item, index) => (
                    <Paper
                      key={index}
                      elevation={3}
                      style={{
                        width: "150px",
                        height: "60px",
                        margin: "0 0 20px 20px",
                        padding: "5px 0 0 5px",
                      }}
                    >
                      {item}
                    </Paper>
                  ))}
                </div>

                <div
                  className="layer"
                  style={{
                    width: "90%",
                    margin: "0 0 10px 20px",
                    color: "#1976D2",
                    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                    fontWeight: "400",
                    fontSize: "1rem",
                  }}
                >
                  Layer
                </div>
                <Slider
                  defaultValue={5}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  step={1}
                  min={1}
                  max={10}
                  style={{ width: "90%", margin: "0 0 20px 20px" }}
                  onChange={handleChange}
                  value={values.Layer}
                />
                <div
                  className="layer"
                  style={{
                    width: "90%",
                    margin: "0 0 10px 20px",
                    color: "#1976D2",
                    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                    fontWeight: "400",
                    fontSize: "1rem",
                  }}
                >
                  NLP Weightage
                </div>
                <Slider
                  defaultValue={0.5}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  step={0.1}
                  min={0.1}
                  max={1}
                  style={{ width: "90%", margin: "0 0 20px 20px" }}
                  onChange={handleChange}
                  value={values.NLP}
                />
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                  <Button variant="contained">Add</Button>
                </div>
              </Box>
            </div>
          </>
        </div>
      )}
    </>
  );
};
export default Image;
