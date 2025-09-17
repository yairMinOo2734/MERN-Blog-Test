import React from 'react'
import PostForm from '../components/PostForm'

const EditPage = () => {
  return (
    <PostForm uiTitle={"Update Post"} uiBtnText={"Edit your post here"} isEditMode = {true} />
  )
}

export default EditPage
