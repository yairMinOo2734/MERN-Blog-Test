import { Link } from "react-router-dom"

const Postitem = ({post}) => {

  const { title , username , image , time , description } = post;

  return (
    <div className="mb-r4">
      <Link to={`/post/${title}`}>
      <h2 className="text-3xl font-medium">{title.toUpperCase()}</h2>
      <p className="text-sm my-2 font-medium text-gray-500">{username}</p> | <span>{time}</span>
      <img src={image} alt={title} className="h-64 w-full object-cover" />  
      <p className="font-normal text-gray-600 my-3">{description.slice(0 , 230)}</p>  
      </Link>
    </div>  
  )
}

export default Postitem
