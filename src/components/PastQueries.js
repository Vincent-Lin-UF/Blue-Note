import React, { useState } from "react";
import { Accordion, Button, Tabs, Tab, Dropdown } from "react-bootstrap";
import { useRequests } from "../context/RequestContext";
import { v4 as uuidV4 } from "uuid";

export function PastQueries() {
  const { requests, classes, removeRequest } = useRequests();
  let eventKeys = -1;

  return (
    <>
      <div style={{ marginTop: "2vh" }}>
        <Tabs>
          {classes.map((classType) => {
            return (
              <Tab
                eventKey={classType.title}
                title={classType.title}
                key={classType.key}
              >
                <Accordion defaultActiveKey="0" key={uuidV4()}>
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
