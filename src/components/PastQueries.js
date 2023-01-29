import React, { useState } from "react";
import { Accordion, Button, Tabs, Tab, Dropdown } from "react-bootstrap";
import { useRequests } from "../context/RequestContext";
import { v4 as uuidV4 } from "uuid";
import image from "../assets/wave.svg";

export function PastQueries() {
  const { requests, classes, removeRequest } = useRequests();
  let eventKeys = -1;

  return (
    <>
      <div
        style={{
          backgroundColor: "#000b24",
          width: "100%",
          height: "100%",

          position: "absolute",
        }}
      >
        <Tabs style={{ backgroundColor: "#000b24", color: "white" }}>
          {classes.map((classType) => {
            return (
              <Tab
                style={{ backgroundColor: "#000b24", color: "white" }}
                eventKey={classType.title}
                title={classType.title}
                key={classType.key}
              >
                <Accordion
                  style={{ backgroundColor: "#000b24", color: "white" }}
                  defaultActiveKey="0"
                  key={uuidV4()}
                >
                  {requests.map((request) => {
                    if (request.classValue === classType.title) {
                      eventKeys += 1;
                      return (
                        <Accordion.Item eventKey={eventKeys} key={uuidV4()}>
                          <Accordion.Header>{request.title}</Accordion.Header>
                          <Accordion.Body>
                            {<a href={`${request.url}`}>View Video</a>}
                            <br />
                            {request.summary}
                            <br />
                            <Button
                              className="mt-2"
                              onClick={() => {
                                removeRequest({ title: request.title });
                              }}
                            >
                              Remove Summary
                            </Button>
                          </Accordion.Body>
                        </Accordion.Item>
                      );
                    }
                  })}
                </Accordion>
              </Tab>
            );
          })}
        </Tabs>
      </div>
    </>
  );
}
