import { Link } from "react-router-dom"
import { formatISO9075 } from "date-fns"

const Postitem = ({post}) => {

  const { title , imageUrl , author , createdAt , _id } = post;

  return (
    <div className="mb-r4">
      <Link to={`/post/${_id}`}>
      <h2 className="text-3xl font-medium">{title.toUpperCase()}</h2>
      <p className="text-sm my-2 font-medium text-gray-500">{author?.username}</p> | <span>{formatISO9075(new Date(createdAt),{ representation : "date" }) }</span>
      <img src={imageUrl} alt={title} className="mx-auto h-80 w-190 object-cover rounded-2xl mt-4" />  
      {/* <p className="font-normal text-gray-600 my-3">{description.slice(0 , 230)}</p>   */}
      <hr className="my-10"/>
      </Link>
    </div>  
  )
}

export default Postitem
