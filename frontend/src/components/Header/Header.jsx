import React from "react";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";

const Header = ({ setSearch }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/">NoteZipper</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Form inline className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Navbar.Collapse id="navbarScroll" className="m-auto">
            {userInfo ? (
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link>
                  <Link to="/mynotes">My Notes</Link>
                </Nav.Link>
                <NavDropdown
                  title={userInfo?.name}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item href="#action3">
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link>
                  <Link to="/login">Login</Link>
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
