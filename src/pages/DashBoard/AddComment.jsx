import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// HOOKS
import uuid from 'react-uuid'
import { timeStamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFireStore } from '../../hooks/useFireStore'

// ANIMATE ON SCROLL
import AOS from 'aos'
import 'aos/dist/aos.css'

// COMPONENTS
import { RiChatNewLine } from 'react-icons/ri'

// STYLES
import styles from './DashBoard.module.scss'

const AddComment = ({ taskId, taskComments, toggleTextArea }) => {
  // ANIMATE ON SCROLL
  useEffect(() => {
    AOS.init()
    AOS.refresh()
  }, [])

  const { user } = useAuthContext()
  const { addComment, response } = useFireStore('Tasks')
  const [newComment, setNewComment] = useState('')
  const [toggle, setToggle] = useState(false)

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
    <>
      <div
        className={styles.add_comment_toggle}
        data-aos='fade-up'
        data-aos-delay='600'
        onClick={() => setToggle((prevState) => !prevState)}>
        <RiChatNewLine />
        <span>{toggle ? 'Close' : 'Add Comment'}</span>
      </div>

      {toggle && (
        <form className={styles.add_comment} onSubmit={handleAddComment} data-aos='fade-up'>
          <textarea
            placeholder='Enter New Comment'
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            minLength={5}
            maxLength={100}
            required></textarea>
          <button className={styles.comments_btn}>Add Comment</button>
        </form>
      )}
    </>
  )
}

export default AddComment

AddComment.propTypes = {
  taskId: PropTypes.string,
  taskComments: PropTypes.array,
  toggleTextArea: PropTypes.bool
}
