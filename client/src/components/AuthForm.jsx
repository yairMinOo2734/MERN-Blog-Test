import { useSearchParams } from "react-router-dom"

const AuthForm = () => {

  const [ searchParams ] = useSearchParams();

  const isLoginMode = searchParams.get("mode") === "login";

  return (
<section className="w-1/2 mx-auto ">
<h1 className="text-center font-black text-2xl mb-4">{isLoginMode? "login" : "register"} Form</h1>
    <form>
        <div className="mb-4">
            <label className="font-medium" htmlFor="username" >Enter Username</label>
            <input className="block border border-black text-lg p-2 w-full" type="text" name="username" id="username" required/>
        </div>
        <div className="mb-4">
            <label className="font-medium" htmlFor="password" >Enter password</label>
            <input className="block border border-black text-lg p-2 w-full" type="password" name="password" id="password" required/>
        </div>
    </form>
    <button className="text-white font-medium text-lg text-cneter py-4 w-full bg-black">{isLoginMode? "login" : "register"} Account</button>
</section>
  )
}

export default AuthForm
