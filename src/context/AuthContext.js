import React, { createContext, useState, useEffect, useContext } from "react";
import { db, auth } from "../firebase/Firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { SnackbarContext } from "../context/SnackbarProvider";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { callSnackbar } = useContext(SnackbarContext);
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setClient({
          uid: uid,
        });
        navigate("/dashboard/home");
      } else {
        setClient(null);
        navigate("/login");
      }
    });
  }, [isAuthenticated]);

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsAuthenticated(true);
        callSnackbar(true,"success","logged in succesfully")
      })
      .catch((err) => {
        console.log(err.message);
        callSnackbar(true,"error", "Wrong Credentials","error");
      });
  };
  const signIn = (email, password) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsAuthenticated(true);
        console.log(user);
        setClient(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const Signout = () => {
    signOut(auth)
      .then(() => {
        callSnackbar(true,'error',"logged out succesfully")
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        login,
        Signout,
        client,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
