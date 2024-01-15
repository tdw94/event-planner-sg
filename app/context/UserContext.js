import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import auth from '@react-native-firebase/auth';
import PropTypes from 'prop-types';
import { addUserToDb, getUserById } from '../services/firebase/firestore';
import { showErrorToast } from '../components/toast';
import { useTranslation } from 'react-i18next';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [freshUser, setFreshUser] = useState(false);
  const { t } = useTranslation();

  const getUserDetails = async (userData) => {
    try {
      const userRef = await getUserById(userData.uid);
      if (userRef?.exists) {
        setUser(userRef.data());
        setInitializing(false);
      } else {
        // set flag to detect the first time user
        setFreshUser(true);
        createUser(userData);
      }
    } catch (error) {
      showErrorToast(t('errors.commonError'));
      setInitializing(false);
    }
  };

  // a method to get updated user from firestore
  const refreshUser = async () => {
    try {
      const userRef = await getUserById(user.userId);
      setUser(userRef.data());
    } catch (error) {
      showErrorToast(t('error.fetchError'));
    }
  };

  // a method to create a user in firestore
  const createUser = async (userData) => {
    try {
      await addUserToDb(userData.uid, userData.email);
      setUser({
        userId: userData.uid,
        email: userData.email
      });
      setInitializing(false);
    } catch (_error) {
      showErrorToast(t('errors.signUpFail'));
      setInitializing(false);
    }
  };

  // Handle user state changes
  const onAuthStateChanged = (userData) => {
    if (userData) {
      getUserDetails(userData);
    } else {
      // if logout, userData=null
      setUser(userData);
      setInitializing(false);
    }
  };

  useEffect(() => {
    // listen to user state changes (signIn/signUp/signOut)
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
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
