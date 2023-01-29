import React from "react";
import { Accordion } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";

export function DictionaryList(items) {
  const itemMap = new Map(Object.entries(items["items"]));
  const itemArray = [];

  itemMap.forEach((item) => {
    itemArray.push(item);
  });

  let eventKeys = -1;
  return (
    <>
      <Accordion
        variant="dark"
        alwaysOpen
        style={{ width: "50vw", color: "#003366" }}
      >
        {itemArray.map((item) => {
          eventKeys += 1;
          return (
            <>
              <Accordion.Item eventKey={eventKeys} key={uuidV4()}>
                <Accordion.Header style={{ backgroundColor: "#003366" }}>
                  {item.name}
                </Accordion.Header>
                <Accordion.Body
                  style={{ color: "white", backgroundColor: "#003366" }}
                >
                  {item.definition}
                </Accordion.Body>
              </Accordion.Item>
            </>
          );
        })}
      </Accordion>
    </>
  );
}
