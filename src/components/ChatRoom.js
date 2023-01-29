import {
  collection,
  addDoc,
  getFirestore,
  query,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { app } from "../firebase";
import { Button, Form } from "react-bootstrap";
import { useRef } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { useEffect } from "react";

export function ChatRoom() {
  const db = getFirestore(app); // initialize cloud firestore and reference
  const chatRef = useRef();

  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const [chats, setChats] = useState([]);

  //   const getAllData = async () => {
  //     const querySnapshot = await getDocs(collection(db, "user_messages"))
  //       .then((data) => setChats(data))

  //     // querySnapshot.forEach((doc) => {
  //     //   // doc.data() is never undefined for query doc snapshots

  //     //   console.log(doc.id, " => ", doc.data());
  //     // });
  //   };

  useEffect(() => {
    const q = query(collection(db, "user_messages"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let todosArr = [];
      QuerySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setChats(todosArr);
    });
    return () => unsubscribe();
  });

  const addData = async (e) => {
    e.preventDefault();
    //adds data to database
    try {
      const docRef = await addDoc(collection(db, "user_messages"), {
        message: chatRef.current.value,
        user: user.displayName,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    chatRef.current.value = "";
  };

  return (
    <div style={{ position: "absolute" }}>
      <Form>
        <Form.Control ref={chatRef} type="text" placeholder="Enter Chat Here" />
        <Button type="submit" onClick={addData}>
          Send
        </Button>
      </Form>
      {/* <Button onClick={getAllData}>Refresh</Button> */}
      {chats &&
        chats.map((chat) => {
          return <p>{chat.message}</p>;
        })}
    </div>
  );
}
