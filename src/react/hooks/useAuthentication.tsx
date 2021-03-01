import React from 'react';
import { AuthenticationContext } from '../contexts';

const useAuthentication = () => React.useContext(AuthenticationContext);

export default useAuthentication;
