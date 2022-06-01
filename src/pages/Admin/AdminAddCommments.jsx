import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// ANIMATE ON SCROLL
import AOS from 'aos'
import 'aos/dist/aos.css'

// HOOKS
import { timeStamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import uuid from 'react-uuid'
import { useFireStore } from '../../hooks/useFireStore'

// STYLES
import styles from './Admin.module.scss'

const AddComment = ({ taskId, taskComments }) => {
  // ANIMATE ON SCROLL
  useEffect(() => {
    AOS.init()
    AOS.refresh()
  }, [])

  const { user } = useAuthContext()
  const { addComment, response } = useFireStore('Tasks')
  const [newComment, setNewComment] = useState('')

  const handleAddComment = async (e) => {
    e.preventDefault()

    const commentToAdd = {
      displayName: user.displayName,
      content: newComment,
      id: uuid(),
      voteCount: 0,
      createdAt: timeStamp.fromDate(new Date())
    }

    // console.log(taskId)
    // console.log(taskComments)
    // console.table(commentToAdd)

    await addComment(taskId, {
      comments: [...taskComments, commentToAdd]
    })
    if (!response.error) {
      setNewComment('')
    }
  }

  return (
    <form
      className={styles.add_comment}
      onSubmit={handleAddComment}
      data-aos='fade-up'
      data-aos-delay='400'>
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

AddComment.propTypes = {
  taskId: PropTypes.string,
  taskComments: PropTypes.array
}
