import { Router, Route, Switch } from 'react-router-dom';
import { createHashHistory } from 'history';

import { LoginPage, MonitorPage } from '../containers';
import PrivateRouter from './PrivateRouter';

const history = createHashHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <PrivateRouter exact path="/monitor" component={MonitorPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
