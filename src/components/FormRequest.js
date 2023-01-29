import React, { useEffect, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useRequests } from "../context/RequestContext";
import { DictionaryList } from "./DictionaryList";
import image from "../assets/wave.svg";

export function FormRequest() {
  const { addRequest, classes } = useRequests();
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

    await fetch("http://127.0.0.1:5000/summary", {
      method: ["POST"],
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(videoId),
    })
      .then((response) => response.json())
      .then((data) => {
        setSummary(data["prediction"]);
      });

    await fetch("http://127.0.0.1:5000/topTen", {
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

  //#002142

  return (
    <>
      <div
        style={{
          backgroundColor: "#000b24",
          width: "100%",
          position: "absolute",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            margin: "0 auto",
            width: "500px",
            marginTop: "10px",
            flexWrap: "wrap",
          }}
        >
          <Form variant="dark" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "white" }}>Video URL</Form.Label>

              <Form.Control
                style={{ backgroundColor: "#343a40", color: "white" }}
                ref={requestRef}
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "white" }}>Video Title</Form.Label>

              <Form.Control
                style={{ backgroundColor: "#343a40", color: "white" }}
                ref={titleRef}
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "white" }}>Video Genre</Form.Label>

              <Form.Control
                style={{ backgroundColor: "#343a40", color: "white" }}
                ref={genreRef}
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "white" }}>Class</Form.Label>
              <Form.Select
                ref={classRef}
                style={{ backgroundColor: "#343a40", color: "white" }}
                required
              >
                {classes.map((classType) => {
                  return (
                    <option
                      key={classType.id}
                      value={classType.title}
                      style={{ backgroundColor: "#343a40", color: "white" }}
                    >
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
              <Button
                variant="dark"
                style={{ border: "2px solid gray" }}
                type="submit"
              >
                Summarize
              </Button>
            )}
          </Form>
        </div>
        {topTen && (
          <div
            style={{
              display: "flex",
              margin: "2vw 2vw",
              flexDirection: "row",
              border: "3px solid gray",
              borderRadius: "10px",
              backgroundColor: "#343a40",
            }}
          >
            <div style={{ width: "50vw", padding: "1vw 2vw 1vw 1vw" }}>
              <h1
                style={{
                  color: "white",
                }}
              >
                {title}
              </h1>
              <p style={{ color: "white", height: "auto" }}>
                Summary: {summary}
              </p>
            </div>
            <DictionaryList
              style={{
                width: "500px",
              }}
              items={topTen}
            />
          </div>
        )}
        <img src={image} alt="Your SVG" />
      </div>
    </>
  );
}
