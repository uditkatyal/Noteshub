import React, { useState, useEffect } from "react";
import MainScreen from "../../components/MainScreen.jsx";
import { Card, Form, Button } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { updateNotes, deleteNotes } from "../../actions/notesAction";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();
  const noteUpdate = useSelector((state) => state.noteUpdate);

  const navigate = useNavigate();

  const { loading, error } = noteUpdate;
  const { id } = useParams();
  const updateHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    dispatch(updateNotes(id, title, content, category));
    navigate("/mynotes");
  };
  const deleteHandler = (e) => {
    if (window.confirm("Are you sure you want to delete")) {
      dispatch(deleteNotes(id));
    }
    navigate("/mynotes");
  };

  useEffect(() => {
    const fetchData = async () => {
      // const config = {
      //     headers: {
      //         'Content-Type': 'application/json',
      //         Authorization: `Bearer {}`
      //     }
      // }
      console.log("Fetching data");
      const { data } = await axios.get(`/api/notes/${id}`);
      console.log(data);
      setTitle(data.note.title);
      setContent(data.note.content);
      setCategory(data.note.category);
      setDate(data.note.updatedAt);
    };
    fetchData();
  }, [id, date]);
  return (
    <MainScreen title="edit note">
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
        <Button variant="primary" type="submit" onClick={updateHandler}>
          Update Note
        </Button>
        <span> </span>
        <Button variant="primary" onClick={deleteHandler}>
          Delete Note
        </Button>
      </Form>
      <Card.Footer>Updated on {date.substring(0, 10)}</Card.Footer>
    </MainScreen>
  );
};

export default UpdatePage;
