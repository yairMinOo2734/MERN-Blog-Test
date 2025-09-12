import { Link } from "react-router-dom"
import BaclIcon from "../icons/BaclIcon"

const DetailPage = () => {
  return (
    <section>
        <div className="flex items-center justify-between">
        <div>
        <h1 className="text-4xl font-bold">Our First Post</h1>
        <p className="text-sm my-2 font-medium text-gray-500">Code Hub</p> | <span>2023-06-01</span>
        </div>
        <Link to={"/"}>
        <BaclIcon/>
        </Link>
        </div>
        <img className="w-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqh7xKoroWs-yGGpgo7M7J0Up1XRBCVOtN5A&s" alt="Our First Post" />
        <p className="font-medium text-gray-700 my-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer varius, augue sit amet commodo viverra, metus sapien consequat purus, vel porta risus turpis nec urna. Praesent finibus nisl et lectus sagittis, nec interdum sem fermentum. Donec in nulla et nisl dignissim facilisis. Aenean laoreet, risus at viverra sodales, justo magna dapibus risus, eget elementum eros enim eget dui. Mauris non velit sit amet mi fermentum suscipit. Vestibulum ultricies, magna sed malesuada malesuada, ipsum orci tristique mi, a vehicula lacus ligula eu erat.</p>
        <div className="flex items-center gap-2 justify-end mb-20">
            <Link to={"/post-edit/1"} className='px-3 py-1 text-lg border-2 border-black bg-black text-white'>Edit</Link>
            <p className='px-3 py-1 text-lg border-2 border-black bg-black text-white'>Delete</p>
        </div>
    </section>
  )
}

export default DetailPage
