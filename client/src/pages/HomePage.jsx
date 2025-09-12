import Postitem from "../components/Postitem"
import fakePosts from "../utils/fakePost"

const HomePage = () => {
  return (
    <>
    {
        fakePosts.map((post)=>(
            <Postitem post={post} key={post.id} />
        ))
    }
    </>
  )
}

export default HomePage
