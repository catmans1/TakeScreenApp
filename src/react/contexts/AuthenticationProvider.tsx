import React, { createContext, useState } from 'react';

const AuthenticationContext = createContext({
  isLogin: false,
  user: null,
  setUser: (user: any) => {},
  setLogin: (login: boolean) => {},
});

type AuthenticationProps = {
  children: React.ReactChild;
};

const AuthenticationProvider: React.FC<AuthenticationProps> = ({
  children,
}) => {
  const [login, setLogin] = useState<boolean>(false);
  const [user, setUser] = useState<any>();

  return (
    <AuthenticationContext.Provider
      value={{
        isLogin: login,
        setLogin: setLogin,
        user: user,
        setUser: setUser,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export { AuthenticationContext, AuthenticationProvider };
