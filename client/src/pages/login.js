import React, { Fragment, useState } from "react";
import {Link} from "react-router-dom"
import {toast} from "react-toastify";

function Login({ setAuth }) {

  const [inputs, setInputs] = useState({
    email: "",
    paasword: "",
  });

  const {email, password} = inputs;

  function onChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  async function onSubmitForm(e){
    e.preventDefault();
    try{
      const body = {email, password};
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(body)
      })

      const parseResponse = await response.json();

      if(parseResponse.token){
        localStorage.setItem("token", parseResponse.token);
        toast.success("Login successfully!")
        setAuth(true);
      } else{
        toast.error(parseResponse)
        setAuth(false)
      }

    }catch(err){
      console.error(err.message)
    }
  }

  return (
    <Fragment>
      <h1 className="text-center my-5">login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3"
          value={email}
          onChange={e => onChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3"
          value={password}
          onChange={e => onChange(e)}
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/register">Register</Link>
    </Fragment>
  );
}

export default Login;
