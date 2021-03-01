import React from 'react';
import { useHistory } from 'react-router-dom';

import { useAuthentication } from '../../hooks';

const LoginPage = () => {
  const history = useHistory();
  const { setLogin } = useAuthentication();

  const onHandle = () => {
    setLogin(true);
    history.push('/monitor');
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex-row p-10 bg-gray-100 shadow-sm rounded-md">
        <div className="text-2xl font-thin text-red-500 text-center">
          Login Page
        </div>
        <div
          className="mt-9 text-center hover:bg-gray-300 border-0 cursor-pointer"
          onClick={onHandle}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
