import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { astractFirestore } from '../../firebase/config'

// ANIMATE ON SCROLL
import AOS from 'aos'
import 'aos/dist/aos.css'

// COMPONENETS
import { RiChatNewLine } from 'react-icons/ri'
import { BsTrash } from 'react-icons/bs'
import { BiDownvote, BiUpvote } from 'react-icons/bi'
import AdminUpdateComment from './AdminUpdateComment'

// STYLES
import styles from './Admin.module.scss'

const AdminComment = ({ task, comment, content, displayName, createdAt, id }) => {
  // ANIMATE ON SCROLL
  useEffect(() => {
    AOS.init()
    AOS.refresh()
  }, [])

  // const [updatedComment, setUpdatedComment] = useState(null)
  const [commentsArray, setCommentsArray] = useState(null)
  const [commentObj, setCommentObj] = useState(null)
  const [taskId, setTaskId] = useState(null)
  const [voteCount, setVoteCount] = useState(0)

  const handleUpVote = () => {
    setVoteCount((prevState) => parseInt(prevState) + 1)
  }

  const handleDownVote = () => {
    setVoteCount((prevState) => {
      if (parseInt(prevState) == 0) {
        return 0
      } else {
        return parseInt(prevState) - 1
      }
    })
  }

  const handleDeleteComment = () => {
    // const deleteComment = async () => {
    //   const res = await astractFirestore
    //     .collection('Tasks')
    //     .doc(taskId)
    //     .update({
    //       comments: commentsArray.arrayRemove(commentObj.value)
    //     })
    // }
    // deleteComment()
  }

  return (
    <>
      <div className={styles.comment} data-aos='fade-up'>
        <div className={styles.comment_container}>
          <div className={styles.comment_content}>
            <p data-aos='fade-up'>
              <span>“</span>
              {content}
              <span>”</span>
            </p>
          </div>

          <div className={styles.comment_details}>
            <span
              className={styles.delete_comment}
              onClick={() => {
                setTaskId(task.id)
                setCommentsArray(task.comments)
                setCommentObj(comment)
                handleDeleteComment
              }}
              data-aos='fade-up'>
              <BsTrash />
            </span>

            <AdminUpdateComment
              data-aos='fade-up'
              data-aos-delay='100'
              comments={task.comments}
              task={task}
              content={content}
              id={id}
            />

            <span className={styles.comment_name} data-aos='fade-up' data-aos-delay='200'>
              <span className={styles.comment_icon}>
                <RiChatNewLine />
              </span>
              {`by ${displayName}`}
            </span>

            <span className={styles.comment_time} data-aos='fade-up' data-aos-delay='300'>
              {`at 
                  ${createdAt.toDate().toLocaleTimeString()} on 
                  ${createdAt.toDate().toDateString()}`}
            </span>
          </div>
        </div>

        <div className={styles.vote}>
          <span className={styles.vote_btn} onClick={handleUpVote}>
            <BiUpvote />
          </span>

          <span
            className={`${styles.vote_count} ${
              voteCount >= 3
                ? styles.positive
                : voteCount < 3 && voteCount !== 0
                ? styles.negative
                : null
            }`}>
            {voteCount}
          </span>

          <span className={styles.vote_btn} onClick={handleDownVote}>
            <BiDownvote />
          </span>
        </div>
      </div>
    </>
  )
}

export default AdminComment

AdminComment.propTypes = {
  comment: PropTypes.object,
  comments: PropTypes.array,
  task: PropTypes.object,
  content: PropTypes.string,
  displayName: PropTypes.string,
  createdAt: PropTypes.object,
  id: PropTypes.string
}
