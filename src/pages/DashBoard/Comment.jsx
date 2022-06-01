import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// ANIMATE ON SCROLL
import AOS from 'aos'
import 'aos/dist/aos.css'

// COMPONENETS
import { RiChatNewLine } from 'react-icons/ri'
import { BsTrash } from 'react-icons/bs'
import { BiDownvote, BiUpvote } from 'react-icons/bi'
import UpdateComment from './UpdateComment'

// STYLES
import styles from './DashBoard.module.scss'

const Comment = ({ task, comment, content, displayName, createdAt, id }) => {
  // ANIMATE ON SCROLL
  useEffect(() => {
    AOS.init()
    AOS.refresh()
  }, [])

  // const [commentsArray, setCommentsArray] = useState(null)
  // const [commentObj, setCommentObj] = useState(null)
  // const [taskId, setTaskId] = useState(null)
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
    // try {
    // const deleteComment = async () => {
    //   const res = await astractFirestore
    //     .collection('Tasks')
    //     .doc(taskId)
    //     .update({
    //       comments: commentsArray.arrayRemove(commentObj.value)
    //     })
    //   // console.log('deleted')
    //   // console.log('res:', res)
    // }
    // deleteComment()
  }

  return (
    <div className={styles.comment} data-aos='fade-up'>
      <div className={styles.comment_container}>
        <div className={styles.comment_content}>
          <p data-aos='fade-up' data-aos-delay='100'>
            <span>“</span>
            {content}
            <span>”</span>
          </p>
        </div>

        <div className={styles.comment_details}>
          <span
            data-aos='fade-up'
            data-aos-delay='200'
            className={styles.delete_comment}
            onClick={() => {
              // setTaskId(task.id)
              // setCommentsArray(task.comments)
              // setCommentObj(comment)
              // console.log(task.comments)
              // console.log('CT', comment)
              handleDeleteComment
            }}>
            <BsTrash />
          </span>

          <UpdateComment comments={task.comments} task={task} content={content} id={id} />

          <span className={styles.comment_name} data-aos='fade-up' data-aos-delay='400'>
            <span className={styles.comment_icon}>
              <RiChatNewLine />
            </span>
            {`by ${displayName}`}
          </span>

          <span className={styles.comment_time} data-aos='fade-up' data-aos-delay='500'>
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
  )
}

export default Comment

Comment.propTypes = {
  comment: PropTypes.object,
  comments: PropTypes.array,
  task: PropTypes.object,
  content: PropTypes.string,
  displayName: PropTypes.string,
  createdAt: PropTypes.object,
  id: PropTypes.string
}
