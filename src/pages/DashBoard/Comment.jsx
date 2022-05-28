import PropTypes from 'prop-types'

// COMPONENETS
import { RiChatNewLine } from 'react-icons/ri'
import { BsTrash } from 'react-icons/bs'
import { FaRegEdit } from 'react-icons/fa'
import { BiDownvote, BiUpvote } from 'react-icons/bi'

// STYLES
import styles from './DashBoard.module.scss'
import { useState } from 'react'
import { useFireStore } from '../../hooks/useFireStore'

const Comment = ({ comment, content, displayName, createdAt, id }) => {
  const { deleteTaskDoc } = useFireStore('Tasks.comments')
  // console.log(useFireStore('Tasks.comments'))

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

  return (
    <div className={styles.comment}>
      <div className={styles.comment_container}>
        <div className={styles.comment_content}>
          <p>
            <span>“</span>
            {content}
            <span>”</span>
          </p>
        </div>

        <div className={styles.comment_details}>
          <span className={styles.comment_name}>
            <span className={styles.comment_icon}>
              <RiChatNewLine />
            </span>
            {`by ${displayName}`}
          </span>

          <span className={styles.comment_time}>
            {` at 
                  ${createdAt.toDate().toLocaleTimeString()} on 
                  ${createdAt.toDate().toDateString()}`}
          </span>
        </div>

        <div className={styles.comment_btns}>
          <span
            className={styles.delete_comment}
            onClick={() => {
              // deleteTaskDoc(id)
              // console.log(comment)
            }}>
            <BsTrash />
          </span>

          <span
            className={styles.edit_comment}
            onClick={() => {
              // console.log(id)
              // console.log(comment)
            }}>
            <FaRegEdit />
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
  content: PropTypes.string,
  displayName: PropTypes.string,
  createdAt: PropTypes.object,
  id: PropTypes.string
  // comments: PropTypes.array,
  // key: PropTypes.string,
  // vote: PropTypes.number,
}
