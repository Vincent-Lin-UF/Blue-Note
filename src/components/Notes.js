import React, { useRef, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useRequests } from "../context/RequestContext";
import { v4 as uuidV4 } from "uuid";

export function Notes() {
  const { classes } = useRequests();
  const [summary, setSummary] = useState();
  const [notes, setNotes] = useState("");
  const [links, setLinks] = useState([]);

  const notesRef = useRef();
  const classRef = useRef();

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(notesRef.current.value);
    setNotes(notesRef.current.value);
    await fetch("/analyze", {
      method: ["POST"],
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notesRef.current.value),
    })
      .then((response) => response.json())
      .then((data) => {
        setSummary(data["prediction"]);
      });
  }

  // useEffect(() => {
  //   if (summary !== undefined && notes !== undefined) {
  //     addNotes({
  //       summary: summary,
  //       notes: notes,
  //       classNow: classRef.current.value,
  //     });
  //   }
  // }, [notesRef, summary]);

  /////////////////////////////////////////////////////////////////////
  // let word_list = [];

  // useEffect(() => {
  //   if (summary !== undefined) {
  //     let start = summary.indexOf("http")
  //     let end = summary.indexOf(end,)

  //     console.log(word_list);
  //     console.log(summary);
  //   }
  // }, [summary]);

  return (
    <>
      <div style={{ display: "flex", margin: "1vw" }}>
        <Form onSubmit={handleSubmit} key={uuidV4()}>
          <div
            style={{
              display: "flex",
              width: "50vw",
              // border: "1px solid red",
              flexGrow: 1,
            }}
          >
            <Form.Group>
              <Form.Select ref={classRef} required style={{ width: "400px" }}>
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
            <Button style={{ marginLeft: "auto" }} type="submit">
              Analyze
            </Button>
          </div>

          <Form.Group>
            <Form.Control
              ref={notesRef}
              type="text"
              placeholder="Enter Notes"
              as="textarea"
              style={{
                height: "80vh",
                width: "50vw",
                resize: "none",
                marginTop: "1vh",
              }}
            />
          </Form.Group>
        </Form>
        <p
          style={{
            padding: "1vw",
            paddingTop: "0.5vw",
            border: "1px solid #c7c7c7",
            borderRadius: "5px",
            marginLeft: "0.5vw",
            height: "86.6vh",
            width: "50vw",
          }}
        >
          Sources:
          <br />
          {summary}
        </p>
      </div>
    </>
  );
}
