import { useState } from "react";
import { redirect, useSearchParams } from "react-router-dom"

const AuthForm = () => {

  const [ username , setusername ] = useState();
  const [ password , setpassword ] = useState();

  const [ searchParams ] = useSearchParams();

  const isLoginMode = searchParams.get("mode") === "login";

  const login = () => {}

  const register = async() => {
    const response = await fetch(`${import.meta.env.VITE_URL}/register`,{
      method : "POST",
      body : JSON.stringify({username,password}),
      headers : {
        "Content-Type" : "application/json"
      }
    })
    if(response.ok){
      redirect("/auth?mode=login");
    }else{
      alert("registration failed")
    }
  }

  const formActionHandler = (e) => {
    e.preventDefault()

    if(isLoginMode){
      login()
    }else{
      register()
    }
  }

  return (
<section className="w-1/2 mx-auto ">
<h1 className="text-center font-black text-2xl mb-4">{isLoginMode? "login" : "register"} Form</h1>
    <form method="post" onSubmit={formActionHandler}>
        <div className="mb-4">
            <label className="font-medium" htmlFor="username" >Enter Username</label>
            <input value={username} onChange={(e)=>setusername(e.target.value)} className="block border border-black text-lg p-2 w-full" type="text" name="username" id="username" required/>
        </div>
        <div className="mb-4">
            <label className="font-medium" htmlFor="password" >Enter password</label>
            <input value={password} onChange={(e)=>setpassword(e.target.value)} className="block border border-black text-lg p-2 w-full" type="password" name="password" id="password" required/>
        </div>
        <button className="text-white font-medium text-lg text-cneter py-4 w-full bg-black">{isLoginMode? "login" : "register"} Account</button>
    </form>
</section>
  )
}

export default AuthForm
