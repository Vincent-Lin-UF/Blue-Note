import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { app } from "../firebase";

import { Button } from "react-bootstrap";

const db = getFirestore(app); // initialize cloud firestore and reference

const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  const addData = async () => {
    //adds data to database
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "wow",
        last: "dick",
        born: 420,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#000b24",
        width: "100%",
        height: "100%",
        position: "absolute",
      }}
    >
      <div
        style={{
          margin: "1vw",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div>
          <h1 style={{ color: "white" }}>Account</h1>
          <p style={{ color: "white" }}>User Email: {user && user.email}</p>

          <Button
            variant="dark"
            style={{ border: "2px solid gray" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Account;
