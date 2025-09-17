import { Link, Navigate, useParams } from "react-router-dom"
import BaclIcon from "../icons/BaclIcon"
import { useContext, useEffect, useState } from "react"
import { formatISO9075 } from "date-fns"
import { UserContext } from "../../UserContext"

const DetailPage = () => {

  const {userInfo} = useContext(UserContext)
  const [post , setPost ] = useState([]);
  const parsms = useParams();
  const [ redirect , setRedirect ] = useState(false)

  const getPost = async() => {
    const response = await fetch(`${import.meta.env.VITE_URL}/post/${parsms.id}`);

    const pp = await response.json()
    setPost(pp)
  }

  useEffect(()=>{getPost()} , [])

  const {title , author , createdAt , imageUrl , content , _id} = post

  const postDelete = async() => {
    const response = await fetch(`${import.meta.env.VITE_URL}/post-delete/${parsms.id}`,{
      method : "DELETE",
      credentials : "include",
      body : JSON.stringify({author_id : author._id}),
      headers : {
        "Content-Type" : "application/json"
      }
    })
    if(response.ok){
      setRedirect(true);   
    }else{
      alert("Something went worg..")
    }
  }

     if(redirect){
   return <Navigate to="/"/>
  }

  return (
    <section>
        <div className="flex items-center justify-between">
        <div>
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-sm my-2 font-medium text-gray-500">{author?.username}</p> | <span>{createdAt ? formatISO9075(new Date(createdAt),{ representation : "date" }) : "this is error"}</span>
        </div>
        <Link to={"/"}>
        <BaclIcon/>
        </Link>
        </div>
        <img className="w-full" src={imageUrl} alt={title} />
        <div className="font-medium text-gray-700 my-3" dangerouslySetInnerHTML={{ __html: content }}></div>
{
  author && userInfo &&
  <>
  {
    userInfo.user_id === author._id &&
        <div className="flex items-center gap-2 justify-end mb-20">
            <Link to={`/post-edit/${_id}`} className='px-3 py-1 text-lg border-2 border-black bg-black text-white'>Edit</Link>
            <p onClick={postDelete} className='px-3 py-1 text-lg border-2 border-black bg-black text-white'>Delete</p>
        </div>
  }
  </>
}
    </section>
  )
}

export default DetailPage


