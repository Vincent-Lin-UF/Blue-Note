/*
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
*/

import React from "react";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import ResetPassword from "./components/PassReset";
import Account from "./components/Account";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { NavBar } from "./components/NavBar";
import { PastQueries } from "./components/PastQueries";
import { Notes } from "./components/Notes";
import { FormRequest } from "./components/FormRequest";
import { RequestProvider } from "./context/RequestContext";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <RequestProvider>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/passwordreset" element={<ResetPassword />} />

            <Route
              path="/summarize"
              element={
                <ProtectedRoute>
                  <NavBar />
                  <FormRequest />
                </ProtectedRoute>
              }
            />

            <Route
              path="/queries"
              element={
                <ProtectedRoute>
                  <NavBar />
                  <PastQueries />
                </ProtectedRoute>
              }
            />

            <Route
              path="/notes"
              element={
                <ProtectedRoute>
                  <NavBar />
                  <Notes />
                </ProtectedRoute>
              }
            />

            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <NavBar />
                  <Account />
                </ProtectedRoute>
              }
            />
          </Routes>
        </RequestProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
