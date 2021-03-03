import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuthentication } from '../hooks';

const PrivateRouter: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props) => {
  const { isLogin } = useAuthentication();

  return isLogin ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/" />
  );
};
export default PrivateRouter;
