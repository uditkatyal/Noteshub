import React from "react";
import { useEffect } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Badge, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
// import notes from "../../data/notes";
import { useDispatch, useSelector } from "react-redux";
import { listNotes } from "../../actions/notesAction";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { deleteNotes } from "../../actions/notesAction";

const MyNotes = ({ search }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.noteList);

  const userLogin = useSelector((state) => state.userLogin);
  const noteCreate = useSelector((state) => state.noteCreate);
  const noteUpdate = useSelector((state) => state.noteUpdate);
  const noteDelete = useSelector((state) => state.noteDelete);

  const { success: successCreate } = noteCreate;
  const { success: successUpdate } = noteUpdate;
  const {
    // loading: deleteLoading,
    error: deleteError,
    success: successDelete,
  } = noteDelete;
  const { userInfo } = userLogin;
  const { loading, notes, error } = noteList;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      dispatch(deleteNotes(id));
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    dispatch(listNotes());
  }, [
    dispatch,
    successCreate,
    successUpdate,
    successDelete,
    navigate,
    userInfo,
    search,
  ]);

  return (
    <MainScreen title={`Welcome back ${userInfo.name}`}>
      <Link to="/create">
        <Button>
          <i className="fas fa-plus"></i> Create New Note
        </Button>
      </Link>
      {/* {deleteLoading && <Loading />} */}
      {deleteError && (
        <ErrorMessage variant="danger">{deleteError}</ErrorMessage>
      )}
      {loading && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {notes?.notes?.length === 0 ? (
        <div style={{ margin: "20px" }}>
          <ErrorMessage variant="info">It feels so light!</ErrorMessage>
        </div>
      ) : notes?.notes !== undefined && notes?.notes !== null ? (
        notes.notes
          .reverse()
          .filter((noteSearch) =>
            noteSearch.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((note) => {
            return (
              <Accordion key={Math.random()}>
                <Card style={{ margin: 10 }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Accordion.Header style={{ flex: 1 }}>
                      <Card.Header style={{ display: "flex", width: "100%" }}>
                        <div
                          style={{
                            color: "black",
                            textDecoration: "none",
                            flex: 1,
                            cursor: "pointer",
                            alignSelf: "center",
                            fontSize: 18,
                          }}
                        >
                          {note.title}
                        </div>
                      </Card.Header>
                    </Accordion.Header>
                    <div style={{ margin: "10px" }}>
                      <Link to={`/note/${note._id}`}>
                        <Button
                          // href={`note/${note._id}`}
                          className="btn btn-primary"
                          variant="info"
                        >
                          Edit
                        </Button>
                      </Link>
                      <span></span>
                      <Button
                        // href="/delete"
                        className="btn btn-primary"
                        variant="danger"
                        onClick={() => deleteHandler(note._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <Card.Body>
                    <Accordion.Body>
                      <h4>
                        <Badge>Category- {note.category}</Badge>
                      </h4>
                      <blockquote className="blockquote mb-0">
                        <p>{note.content}</p>
                        <footer className="blockquote-footer">
                          Created on {note.createdAt.substring(0, 10)}
                        </footer>
                      </blockquote>
                    </Accordion.Body>
                  </Card.Body>
                </Card>
              </Accordion>
            );
          })
      ) : null}
    </MainScreen>
  );
};

export default MyNotes;
