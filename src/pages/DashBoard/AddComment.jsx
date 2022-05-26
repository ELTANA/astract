import React, { useState } from 'react'
import { timeStamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import uuid from 'react-uuid'
import styles from './DashBoard.module.scss'

const AddComment = () => {
  const { user } = useAuthContext()
  const [newComment, setNewComment] = useState('')

  const addComment = async (e) => {
    e.preventDefault()

    const commentToAdd = {
      displayName: user.displayName,
      content: newComment,
      createdAt: timeStamp.fromDate(new Date()),
      id: uuid()
    }
    console.log(commentToAdd)
  }

  return (
    <form className={styles.add_comment} onSubmit={addComment}>
      <textarea
        placeholder='Enter New Comment'
        onChange={(e) => setNewComment(e.target.value)}
        value={newComment}
        minLength={5}
        required></textarea>
      <button className={styles.comments_btn}>Add Comment</button>
    </form>
  )
}

export default AddComment
