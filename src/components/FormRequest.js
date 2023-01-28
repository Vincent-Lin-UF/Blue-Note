import React, { useEffect, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useRequests } from "../context/RequestContext";
import { DictionaryList } from "./DictionaryList";

export function FormRequest() {
  const { addRequest, classes, addClass } = useRequests();
  const requestRef = useRef();
  const [summary, setSummary] = useState();
  const [topTen, setTopTen] = useState();
  const [buttonType, setButtonType] = useState(false);
  const titleRef = useRef();
  const [title, setTitle] = useState("");
  const genreRef = useRef();
  const classRef = useRef();

  async function handleSubmit(event) {
    event.preventDefault();
    setButtonType(true);
    setTitle(titleRef.current.value);
    const answer = requestRef.current.value;
    const videoId = answer.split("v=")[1];

    await fetch("/summary", {
      method: ["POST"],
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(videoId),
    })
      .then((response) => response.json())
      .then((data) => {
        setSummary(data["prediction"]);
      });

    await fetch("/topTen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId: videoId, genre: genreRef.current.value }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTopTen(data["prediction"]);
        setButtonType(false);
      });
  }

  useEffect(() => {
    if (title !== undefined && summary !== undefined) {
      addRequest({
        url: requestRef.current.value,
        summary: summary,
        title: titleRef.current.value,
        classValue: classRef.current.value,
      });
    }
  }, [summary, requestRef]);

  // useEffect(() => {
  //   let num = 0;
  //   requests.forEach(
  //     (request) => {
  //       num += 1;
  //       console.log("request number", num, ":", request);
  //     },
  //     [requests]
  //   );
  // });

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          margin: "0 auto",
          width: "500px",
          marginTop: "50px",
          flexWrap: "wrap",
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Video URL</Form.Label>

            <Form.Control
              ref={requestRef}
              type="text"
              required
              placeholder="Enter URL Here"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Video Title</Form.Label>

            <Form.Control
              ref={titleRef}
              type="text"
              required
              placeholder="Enter Title Here"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Video Genre</Form.Label>

            <Form.Control
              ref={genreRef}
              type="text"
              required
              placeholder="Enter Genre Here"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Class</Form.Label>
            <Form.Select ref={classRef} required>
              {classes.map((classType) => {
                return (
                  <option key={classType.id} value={classType.title}>
                    {classType.title}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          {buttonType ? (
            <Button variant="secondary" type="submit" disabled>
              Loading...
            </Button>
          ) : (
            <Button variant="primary" type="submit">
              Summarize
            </Button>
          )}
        </Form>
      </div>
      {topTen && (
        <div
          style={{
            display: "flex",
            margin: "5vw 2vw 5vw 2vw",
            flexDirection: "row",
            border: "3px solid gray",
            borderRadius: "10px",
          }}
        >
          <div style={{ width: "50vw", padding: "1vw" }}>
            <h1>{title}</h1>
            <p>Summary: {summary}</p>
          </div>
          <DictionaryList style={{ width: "500px" }} items={topTen} />
        </div>
      )}
    </>
  );
}
