/* eslint-disable react/prop-types */
//  this PROVIDER will be responsible for reutrning the
//  functionality of our  FIREBASE SERVICE.
import { useEffect, useState, createContext } from 'react';
import { auth } from "../fireBase";


export const UserContext = createContext(null);

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { email, displayName, photoURL, uid } = user;
        setUser({ email, displayName, photoURL, uid });
      } else {
        setUser(null);
      }
    });
  }, []);
  
  return (
    <UserContext.Provider value={user}>
      <div>{props.children}</div>
    </UserContext.Provider>
  );
};
