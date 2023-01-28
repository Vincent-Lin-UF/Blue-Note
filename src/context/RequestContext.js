import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";

const RequestContext = React.createContext();

export function useRequests() {
  return useContext(RequestContext);
}

export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useLocalStorage("requests", []);
  const [classes, setClasses] = useLocalStorage("classes", [
    { title: "No Class", id: uuidV4() },
  ]);

  const [currentClass, setCurrentClass] = useLocalStorage("currentClass", "");

  //   const [requests, setRequests] = useState([]);

  function addRequest({ summary, url, title, classValue }) {
    setRequests((prevRequests) => {
      return [
        ...prevRequests,
        { id: uuidV4(), summary, url, title, classValue },
      ];
    });
  }

  function removeRequest({ title }) {
    setRequests((prevRequests) => {
      return [...prevRequests.filter((request) => request.title !== title)];
    });
  }

  function addClass({ title }) {
    setClasses((prevClasses) => {
      return [...prevClasses, { id: uuidV4(), title, notes: "", summary: "" }];
    });
  }

  // function addNotes({ notes, summary, classNow }) {
  //   const note = classes.find((classValue) => classValue.title === classNow);
  //   note.notes = notes;
  //   note.summary = summary;
  //   setClasses((prevClasses) => {
  //     return [...prevClasses];
  //   });
  // }

  // function removePage({classValue, id}) {
  //   setClasses((prevClasses) => {
  //     return [...prevClasses.find]
  //   })
  // }

  function removeClass({ title }) {
    setClasses((prevClasses) => {
      return [...prevClasses.filter((classType) => classType.title !== title)];
    });
  }

  function clearRequests() {
    setRequests([]);
  }

  return (
    <RequestContext.Provider
      value={{
        requests,
        addRequest,
        clearRequests,
        classes,
        addClass,
        removeClass,
        removeRequest,
        currentClass,
        setCurrentClass,
        // addNotes,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};
