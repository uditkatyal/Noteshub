import React from "react";
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { Card, Form, Button } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { createNotes } from "../../actions/notesAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const noteCreate = useSelector((state) => state.noteCreate);

  const { loading, error } = noteCreate;

  const resetHandler = () => {
    console.log("reset");
    setTitle("");
    setContent("");
    setCategory("");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !category || !content) return;
    dispatch(createNotes(title, content, category));
    navigate("/mynotes");
  };
  return (
    <MainScreen title="Create a Note">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            value={content}
            placeholder="Content"
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        {content && (
          <Card>
            <Card.Header>Preview Content</Card.Header>
            <Card.Body>
              <ReactMarkdown>{content}</ReactMarkdown>
            </Card.Body>
          </Card>
        )}
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={category}
            placeholder="Category"
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>
        {loading && <Loading />}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <Button variant="primary" type="submit" onClick={submitHandler}>
          Create Note
        </Button>
        <span> </span>
        <Button variant="primary" onClick={resetHandler}>
          Reset Fields
        </Button>
      </Form>
      <Card.Footer>Created on {new Date().toLocaleDateString()}</Card.Footer>
    </MainScreen>
  );
};

export default CreatePage;
