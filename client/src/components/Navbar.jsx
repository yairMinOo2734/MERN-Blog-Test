import { useEffect } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../UserContext"
import { useContext } from "react"

const Navbar = () => {

  const { userInfo , setUserInfo } = useContext(UserContext)

  const getUserData = async () => {
    const response = await fetch(`${import.meta.env.VITE_URL}/profile` , {
      credentials : "include",
    });
      if(response.ok){
      const userData = await response.json();
      setUserInfo(userData)
      }else{
      setUserInfo(null)  
      }
  }

  const logout = async() => {
    await fetch(`${import.meta.env.VITE_URL}/logout` , {
      credentials : "include",
      method : "POST",
    });
    setUserInfo(null)
  }

  useEffect(()=>{getUserData()} , [])
  return (
    <nav className='flex items-center justify-between p-10 2xl:px-96'>
        <Link to={"/"} className='font-bold text-2xl uppercase'>Blog.io</Link>
<div>
    {
      userInfo? 
        <div className='flex items-center gap-2'>
            <Link to={"/post-create"} className='px-3 py-1 font-medium text-lg border-2 border-black'>Create Post</Link>
            <p onClick={()=>logout()} className='px-3 cursor-pointer py-1 font-medium text-lg border-2 border-black bg-black text-white'>Log Out</p>
        </div>
         : 
              <div className='flex items-center gap-2'>
            <Link to={"/auth?mode=login"} className='px-3 py-1 font-medium text-lg border-2 border-black'>log in </Link>
            <Link to={"/auth?mode=register"} className='px-3 py-1 font-medium text-lg border-2 border-black bg-black text-white'>register</Link>
        </div>
    }
    {
      userInfo?
     <div className="my-4 border-black border-2 w-55 text-center" >
      <p>{userInfo? "Log in as " + userInfo.username : ""}</p>
    </div>
    :
    ""
    }
</div>
    </nav>
  )
}

export default Navbar
