import React, {Component} from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from './components/Login';
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Register from './components/Register'
import Profile from './components/Profile'
import Commande from './components/Commande'

import './App.css';

class App extends Component {
  render(){
    return (
    /*<div className="container">
      <Login />
    </div>*/
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <div className="container">
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/commande" component={Commande} />
        </div>
      </div>
    </Router>
    );
  }
}

/*function App() {
  return (
    <div className="App">
      <form>
        <label>
          Nom :
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
}*/

export default App;
