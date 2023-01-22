import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        bottom: "0",
        // display: "flex",
        // justifyContent: "center",
      }}
    >
      <Container className="text-center py-3">
        <Row>
          <Col>Copyright &copy; Udit Katyal</Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
