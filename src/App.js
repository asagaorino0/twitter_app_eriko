import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  MemoryRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import MyStar from './pages/MyStar';
import CreateUser from './pages/CreateUser';
// import CreateUser from './pages/CreateUser'

const App = () => {
  return (
    <div className="App">
      <MemoryRouter>
        <Router>
          {/* <Login /> */}
          <Switch>
            <Route exact path='/Main/' component={Main} />
            <Route exact path="/" component={Login} />
            {/* <Route exact path="/" component={LineLogin} /> */}
            <Route exact path="/createUser/:new!" component={CreateUser} />
            {/* <Route exact path="/Main/" component={Main} /> */}
            <Route exact path="/MyPage/" component={MyPage} />
            <Route exact path="/MyStar/" component={MyStar} />
            {/* <Route exact path='/CreateUser/' component={CreateUser} /> */}
          </Switch>
        </Router>
      </MemoryRouter>
    </div>
  );
};
export default App;
