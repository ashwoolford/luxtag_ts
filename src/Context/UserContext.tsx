import { createContext, useContext } from "react";

//Context definition of Auth

export type AuthContextType = {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  setIsAuth: (isAuth) => console.log("no auth provider"),
});

export const useAuthStatus = () => useContext(AuthContext);

//Context definition of JWT Token

export type TokenContextType = {
  token: string;
  setToken: (token: string) => void;
};

export const TokenContext = createContext<TokenContextType>({
  token: "",
  setToken: (token) => console.log("no token provider"),
});

export const useToken = () => useContext(TokenContext);
