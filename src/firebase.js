import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

let firebaseConfig = {
    apiKey: "AIzaSyCp5MoguyzJ5NkxyM-aEPneWDWZBWwFUrY",
    authDomain: "reactapp-fca95.firebaseapp.com",
    databaseURL: "https://reactapp-fca95.firebaseio.com",
    projectId: "reactapp-fca95",
    storageBucket: "reactapp-fca95.appspot.com",
    messagingSenderId: "901494230428",
    appId: "1:901494230428:web:79765f0e1e9bd3d3e64c59",
    measurementId: "G-ER31056CPW"
  }; 

class Firebase{
    constructor(){
        app.initializeApp(firebaseConfig);

        //Referenciando a database para acessar em outros locais
        this.app = app.database();
        this.storage = app.storage();
    }
    
    login(email,password){
        return app.auth().signInWithEmailAndPassword(email,password);
    }

    logout(){
        return app.auth().signOut();
    }

    async register(nome, email, password){
        await app.auth().createUserWithEmailAndPassword(email,password);

        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({
            nome: nome
        })
    }

    isInitialized(){
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve);
        })
    }

    getCurrent(){
        return app.auth().currentUser && app.auth().currentUser.email;
    }

    getCurrentUid(){
        return app.auth().currentUser && app.auth().currentUser.uid;
    }

    async getUserName(callback){
        if(!app.auth().currentUser){
            return null;
        }

        const uid = app.auth().currentUser.uid;
        await app.database().ref('usuarios').child(uid).once('value').then(callback);
    }
}

export default new Firebase();