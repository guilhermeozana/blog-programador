import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './header.css';
import firebase from '../../firebase';

class Header extends Component {

    constructor(props){
        super(props);
        this.state = {
        
        }
    }

    render(){
    return(
      <header id="main-header" >
        <div className="header-content">
          <Link to="/">
            Blog Programador
          </Link>
          <Link to="/login">
            {firebase.getCurrent() ? 
                <span>Painel</span>
              :
              <span>Entrar</span>         
            }
          </Link>
        </div>
      </header>
    );
    }
  }
  
  export default withRouter(Header);