import React from 'react';
import './Login.css'
import { Button } from '@material-ui/core';
import { auth ,provider } from '../firebase';
import { DataLayerValue } from '../data layer/Data';


const Login = () => {
    const [{ user },dispatch] = DataLayerValue();

    const signIn =() =>{
       auth.signInWithPopup(provider).then(res =>(
           dispatch({
               type:'SET_USER',
               user:res.user
           })
        )).then(err => (
            console.log(err)
        ))
    }
    return (
      <div className="login">
        <div className="loginContainer">
          <img
            src="https://lh3.googleusercontent.com/proxy/C0SplKOud0Hz14rzzesfMaTF4h-1wZQ_ft7Qd-pDtvAKQATu486r176a2tgmgcb0N5Ew152jCqbp5UC2aZKHJLep02jcB4OxwvO4zYkEza07wtIbRug"
            alt="Logo"
          />
          <div className="loginText">
            <h1>Sign in to Whatsapp</h1>
          </div>
          <Button  onClick={signIn}>
            Sign In with Google
          </Button>
        </div>
      </div>
    );
}

export default Login;
