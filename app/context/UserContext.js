import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import auth from '@react-native-firebase/auth';
import PropTypes from 'prop-types';
import { addUserToDb, getUserById } from '../services/firebase/firestore';
import { STATUS } from '../constants/status';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [freshUser, setFreshUser] = useState(false);

  const getUserDetails = (userData) => {
    getUserById(userData.uid, (status, doc) => {
      if (status === STATUS.SUCCESS) {
        // try to get data from firestore, if available, set user data, else, create user
        if (doc?.exists) {
          setUser(doc.data());
          setInitializing(false);
        } else {
          // set flag to detect the first time user
          setFreshUser(true);
          createUser(userData);
        }
      } else {
        //
      }
    });
  };

  const refreshUser = () => {
    getUserById(user.userId, (status, doc) => {
      if (status === STATUS.SUCCESS) {
        setUser(doc.data());
      }
    });
  };

  const createUser = (userData) => {
    addUserToDb(userData.uid, userData.email, (status) => {
      if (status === STATUS.SUCCESS) {
        setUser({
          userId: userData.uid,
          email: userData.email
        });
        setInitializing(false);
      }
    });
  };

  // Handle user state changes
  const onAuthStateChanged = (userData) => {
    if (userData) {
      getUserDetails(userData);
    } else {
      setUser(userData);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const userContext = useMemo(
    () => ({
      initializing,
      user,
      refreshUser,
      freshUser,
      setFreshUser
    }),
    [user, freshUser, initializing]
  );

  return <UserContext.Provider value={userContext}>{children}</UserContext.Provider>;
};

// expose reusable hook for user context
export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

UserProvider.propTypes = {
  children: PropTypes.any
};
