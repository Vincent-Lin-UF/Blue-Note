import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { getFirestore } from 'firebase/firestore'
import { collection, addDoc } from 'firebase/firestore';
import { app } from '../firebase'

const db = getFirestore(app); // initialize cloud firestore and reference

const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out')
    } catch (e) {
      console.log(e.message);
    }
  };
  
  const addData = async () => { //adds data to database
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "penis",
        last: "dick",
        born: 420
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <h1>Account</h1>
      <p>User Email: {user && user.email}</p>

      <button onClick={handleLogout}>
        Logout
      </button>
      <button onClick={addData}>
        add data
      </button>

    </div>
  );
};

export default Account;