import React, { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useRequests } from "../context/RequestContext";

export function AddClassModal({ show, handleClose }) {
  const { addClass } = useRequests();
  const nameRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    addClass({
      title: nameRef.current.value,
    });
    handleClose();
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Form
        style={{
          backgroundColor: "#343a40",
          color: "white",
        }}
        onSubmit={handleSubmit}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control className="mb-3" ref={nameRef} type="text" required />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button
              style={{ border: "2px solid gray" }}
              variant="dark"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
