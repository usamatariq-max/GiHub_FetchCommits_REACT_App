import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
// import GithubIcon from "mdi-react/GithubIcon";
// import {FormGroup,Label, Button, Input, Spinner, Form} from 'reactstrap';
import { AuthContext } from "../App";
import axios from 'axios';

export default function Login() {
  const { state,dispatch } = useContext(AuthContext);
  const [data, setData] = useState({ errorMessage: "", isLoading: false });

  let username = React.createRef();
  let token = React.createRef();
  if (state.isLoggedIn) {
    return <Redirect to="/" />;
  }

  axios.interceptors.response.use(
    response => response,
    error => {
      const {status} = error.response;
      if (status === 401) {
        setData({isLoading: false, errorMessage: 'Sorry! Login Failed'});
      }
      return Promise.reject(error);
   }
  );  
  return (
      <div>

        <div>
          <h1>Welcome</h1>
          {/* <span>{data.errorMessage}</span> */}
        </div>
        <div>
          {
            <div>
              <input placeholder="UserName" ref={username}></input>
              <input type="password" placeholder="Personal Access Token" ref={token}></input>
{/* 
              headers: {
                    'Authorization': `token ${state.token}`,
                    'Content-Type': 'application/json'
                }, */}

              <button
                onClick = {async () => {
                  console.log(username.current?.value);
                  console.log(token.current?.value);
                  await axios.get(
                    'https://api.github.com/user',
                    {
                      auth: {
                        username: username.current?.value,
                        password: token.current?.value
                      },
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `token ${token.current?.value}`,

                      }
                    }
                  )
                  // .then(res => res.json())
                  // res.json()
                  .then(res => {
                    console.log(res.data);
                    // console.log(res.login);
                    // console.log(username.current?.value);
                    
                    if (res.data.login === username.current?.value){

                      dispatch({
                        type: "LOGIN",
                        payload: { user: res.data, isLoggedIn: true, token: token.current?.value }
                      });                      
                      <Redirect to="/" />
                    }
                  })
                  .catch(error => {
                    console.log(error);
                    setData({
                      isLoading: false,
                      errorMessage: "Sorry! Login failed"
                    });
                  });
                }}
              >Login With GitHub
              </button>
            </div>
          }
        </div>
      </div>
  );
}
