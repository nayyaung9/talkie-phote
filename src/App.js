import React from 'react'; 
import { Route, Router } from 'react-router-dom';
import Login from './pages/Login';
import ChatList from './pages/ChatList';
import history from './history';

function App() {
  return (
    <Router history={history}>
      <Route exact path="/" component={Login} />
      <Route path="/chat" component={ChatList} />
    </Router>
  );
}

export default App;
