import { useEffect, useState } from "react"
import Postitem from "../components/Postitem"
import fakePosts from "../utils/fakePost"

const HomePage = () => {

  const [posts , setPosts] = useState([])

  const getPosts = async() => {
    const response = await fetch(`${import.meta.env.VITE_URL}/posts`)
    const pp = await response.json()
    setPosts(pp)
  }

  useEffect(()=>{
    getPosts()
  } , [])

  return (
    <section className="grid grid-cols-2 gap-6">
    {
        posts.map((post)=>(
            <Postitem post={post} key={post._id} />
        ))
    }
    </ section>
  )
}

export default HomePage
