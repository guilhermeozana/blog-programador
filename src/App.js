import React,{Component} from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import New from './components/New';
import firebase from './firebase';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './global.css';


class App extends Component{

  state = {
    firebaseInitialized: false 
  };

  componentDidMount(){
    firebase.isInitialized().then(resultado => {
      //devolve o usuário
      this.setState({firebaseInitialized: resultado});
    })
  }

  render(){
    return this.state.firebaseInitialized !== false ? (
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/dashboard/new" component={New}/>
        </Switch>
      </BrowserRouter>
    ) : (
      <h1>Carregando...</h1>
    );
  }
}

export default App;
