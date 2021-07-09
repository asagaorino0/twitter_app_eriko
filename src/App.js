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
import MySitar from './pages/MySitar';
import MyLoad from './pages/MyLoad';
import EventNow from './pages/EventNow';
import EventTuuchi from './pages/EventTuuchi';
import InfoList from './pages/InfoList';
// import CreateUser from './pages/CreateUser'

const App = () => {
  return (
    <div className="App">
      <MemoryRouter>
        <Router>
          {/* <Login /> */}
          <Switch>
            <Route exact path='/Main/' component={Main} />
            <Route exact path='/EventNow/' component={EventNow} />
            <Route exact path="/" component={Login} />
            <Route exact path="/InfoList/" component={InfoList} />
            <Route exact path="/EventTuuchi/:messagesId" component={EventTuuchi} />
            <Route exact path="/MyPage/" component={MyPage} />
            <Route exact path="/MyStar/" component={MyStar} />
            <Route exact path="/MySitar/" component={MySitar} />
            <Route exact path="/MyLoad/" component={MyLoad} />
            {/* <Route exact path='/CreateUser/' component={CreateUser} /> */}
          </Switch>
        </Router>
      </MemoryRouter>
    </div>
  );
};
export default App;
