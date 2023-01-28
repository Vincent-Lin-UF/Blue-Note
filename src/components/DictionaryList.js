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
      <Accordion alwaysOpen style={{ width: "50vw" }}>
        {itemArray.map((item) => {
          eventKeys += 1;
          return (
            <>
              <Accordion.Item eventKey={eventKeys} key={uuidV4()}>
                <Accordion.Header>{item.name}</Accordion.Header>
                <Accordion.Body>{item.definition}</Accordion.Body>
              </Accordion.Item>
            </>
          );
        })}
      </Accordion>
    </>
  );
}
