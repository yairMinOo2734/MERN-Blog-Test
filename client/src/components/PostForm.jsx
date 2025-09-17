import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';

const PostForm = ({uiTitle , uiBtnText , isEditMode}) => {

  const [redirect , setRedirect] = useState(false);

  const [ title , setTitle ] = useState("");
  const [ content , setContent ] = useState("");
  const [ imageUrl , setImageUrl ] = useState("");
  const [ editPostId , setEditPostId ] = useState("");
  const params = useParams()

  const mm = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const ff = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

    let fetchUrl = `${import.meta.env.VITE_URL}/upload`
    let method = "POST"

    if(isEditMode){
      fetchUrl = `${import.meta.env.VITE_URL}/edit-post`
      method = "PUT"
    }

  const getOldData = async() => {
    const response = await fetch(`${import.meta.env.VITE_URL}/post-edit/${params.id}`)

    const post = await response.json()
    const { title , imageUrl , content , _id , author } = post

    setTitle(title)
    setImageUrl(imageUrl)
    setContent(content)
    setEditPostId(_id)
  }

  useEffect(()=>{if(isEditMode){getOldData()}} , [])

  const uploadPost = async(e) => {
    e.preventDefault();

    const fromData = new FormData()

    fromData.append("title",title)
    fromData.append("imageUrl",imageUrl)
    fromData.append("content",content)
    fromData.append("post__id" , editPostId)

    const response = await fetch(fetchUrl , {
      method,
      body : fromData,
      credentials : "include",
    });
    if(response.ok){
      setRedirect(true)
    }else{
      alert("Something went wrong")
    }
  }

  if(redirect){
    return <Navigate to={"/"} />
  }

  return (
    <section className="w-1/2 mx-auto">
            <h1 className="text-xl font-medium my-4">{uiTitle}</h1>
    <form onSubmit={uploadPost} method='POST'>
      {/* {
        isEditMode && <input type='text' name="post__id" hidden value={editPostId}/> 
      } */}
        <div className="mb-2">
            <label className="font-medium" htmlFor="title">Enter post title</label>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" name="title" id="title" required className="border border-black text-lg p-2 w-full block" />
        </div>
        <div className="mb-2">
            <label className="font-medium" htmlFor="image">Upload cover photo url</label>
            <input value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} type="text" name="image" id="image" required className="border border-black text-lg p-2 w-full block" />
        </div>
        <ReactQuill theme="snow" modules={mm} formats={ff} className='h-44' value={content} onChange={setContent} />
        <button className='bg-black text-white text-lg font-medium text-center mt-12 py-4 w-full'>{uiBtnText}</button>
    </form>
    </section>
  )
}

export default PostForm
