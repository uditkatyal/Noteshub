import React, { useState, useEffect } from "react";
import MainScreen from "../../components/MainScreen";
import { Form, Button } from "react-bootstrap";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [pic, setPic] = useState(
  //   "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  // );
  const [message, setMessage] = useState(null);
  // const [picMessage, setPicMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    console.log("state update");
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate, userInfo]);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  // const postDetails = async (pics) => {
  //   console.log("hello");
  //   try {
  //     if (
  //       pics ===
  //       "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  //     ) {
  //       console.log("hello");
  //       return setPicMessage("Please Select an Image");
  //     }
  //     setPicMessage(null);
  //     if (pics.type === "image/jpeg" || pics.type === "image/png") {
  //       const data = new FormData();
  //       data.append("file", pics);
  //       data.append("upload_preset", "noteZipper");
  //       data.append("cloud_name", "du0fzhvbu");
  //       fetch("https://api.cloudinary.com/v1_1/du0fzhvbu", {
  //         method: "post",
  //         body: data,
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           setPic(data.url.toString());
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     } else {
  //       return setPicMessage("Please Select an Image");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    <MainScreen title="register">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      {loading && <Loading />}
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            type="text"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            value={confirmPassword}
            type="password"
            placeholder="Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        {/* {picMessage && (
          <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
        )} */}
        {/* <Form.Group>
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            onChange={(e) => postDetails(e.target.value)}
            id="custom-file"
            type="file"
            label="Upload Profile Picture"
            custom
          />
        </Form.Group> */}

        <Button onClick={submitHandler} variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </MainScreen>
  );
};

export default RegisterPage;
