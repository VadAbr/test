import React, { useState, useContext, createContext } from 'react';
import { getLocalItem, setLocalItem } from '../utils';
import { tokenLocalKey } from '../constants';

type TokenType = string | null;

interface AuthContextProps {
  isLoggedIn: boolean;
  setAuth: (token: TokenType) => void;
}

const useProvideAuth = (): AuthContextProps => {
  const token = getLocalItem(tokenLocalKey);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(token));

  const setAuth = (token: TokenType) => {
    setLocalItem(token, tokenLocalKey);
    setIsLoggedIn(Boolean(token));
  };

  return {
    setAuth,
    isLoggedIn,
  };
};

const authContext = createContext({} as AuthContextProps);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export function useAuth() {
  return useContext(authContext);
}
