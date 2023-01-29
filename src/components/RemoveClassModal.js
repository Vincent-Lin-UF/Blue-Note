import React, { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useRequests } from "../context/RequestContext";

export function RemoveClassModal({ show, handleClose }) {
  const { removeClass, classes } = useRequests();
  const nameRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    removeClass({
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
            <Form.Select ref={nameRef} required>
              {classes.map((classType) => {
                if (classType.title !== "No Class") {
                  return (
                    <option key={classType.id} value={classType.title}>
                      {classType.title}
                    </option>
                  );
                }
              })}
            </Form.Select>
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
