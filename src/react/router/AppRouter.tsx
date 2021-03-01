import { Router, Route, Switch } from 'react-router-dom';
import { createHashHistory } from 'history';

import { LoginPage, MonitorPage, RecordPage } from '../containers';
import PrivateRouter from './PrivateRouter';

const history = createHashHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <PrivateRouter exact path="/monitor" component={MonitorPage} />
        <Route exact path="/record" component={RecordPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
