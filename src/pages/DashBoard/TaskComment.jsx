import PropTypes from 'prop-types'
import { useFireStore } from '../../hooks/useFireStore'

// COMPONENTS
import { RiChatNewLine } from 'react-icons/ri'
import { useState } from 'react'
import { GoCommentDiscussion } from 'react-icons/go'
import { RiChatOffLine } from 'react-icons/ri'
import { BsTrash } from 'react-icons/bs'
import { BiUpvote, BiDownvote } from 'react-icons/bi'

// STYLES
import styles from './DashBoard.module.scss'

const TaskComments = ({ comments }) => {
  // UPVOTE COMMENTS
  const { upVote, response } = useFireStore('Tasks')
  const [voteCount, setVoteCount] = useState(0)

  // const handleUpVote = async () => {
  //   // const voteToAdd = {
  //   //   // voteCount: (vote += 1)
  //   // }
  //   // await upVote(commentId, {
  //   //   voteCount: [...commentVoteCount, voteToAdd]
  //   // })
  //   // if (!response.error) {
  //   //   console.error(response)
  //   // }
  // }

  const handleUpVote = () => {
    setVoteCount((prevState) => prevState + 1)
  }
  const handleDownVote = () => {
    setVoteCount((prevState) => prevState - 1)
  }

  return (
    <>
      {!comments ? (
        <span>Deprecated Task</span>
      ) : (
        <div className={styles.task_comments}>
          {comments.length > 0 ? (
            <div className={styles.comment_toggle__btn}>
              <span>Comments</span>
              <span className={styles.toggle_btn}>
                <GoCommentDiscussion />
              </span>
            </div>
          ) : (
            <div className={styles.comment_toggle__btn}>
              <span>No Comments</span>
              <span className={styles.toggle_btn}>
                <RiChatOffLine />
              </span>
            </div>
          )}

          {comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <div className={styles.comment_container}>
                <div className={styles.comment_content}>
                  <p>
                    <span>“</span>
                    {comment.content}
                    <span>”</span>
                  </p>
                </div>

                <div className={styles.comment_details}>
                  <span className={styles.comment_name}>
                    <span className={styles.comment_icon}>
                      <RiChatNewLine />
                    </span>
                    {`by ${comment.displayName}`}
                  </span>

                  <span className={styles.comment_time}>
                    {` at 
                  ${comment.createdAt.toDate().toLocaleTimeString()} on 
                  ${comment.createdAt.toDate().toDateString()}`}
                  </span>

                  <span
                    className={styles.delete_comment}
                    onClick={() => {
                      // deleteTaskDoc(comments.id)
                    }}>
                    <BsTrash />
                  </span>
                </div>
              </div>

              <div className={styles.vote}>
                <span className={styles.vote_btn} onClick={handleUpVote}>
                  <BiUpvote />
                </span>

                <span
                  className={`${styles.vote_count} ${
                    voteCount > 0 ? styles.positive : voteCount < 0 ? styles.negative : null
                  }`}>
                  {voteCount}
                  {/* {comment.voteCount ? comment.voteCount : 0} */}
                </span>

                <span className={styles.vote_btn} onClick={handleDownVote}>
                  <BiDownvote />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default TaskComments

TaskComments.propTypes = {
  vote: PropTypes.number,
  comments: PropTypes.array
}

// DELETE COMMENT
// const { deleteTaskDoc } = useFireStore('Tasks')

// VOTE
// const [voteCount, setVoteCount] = useState(0)
// setVoteCount((prevState) => prevState + 1)
// setVoteCount((prevState) => prevState - 1)
{
  /* {voteCount} */
}

// console.log(taskId)
// console.log(taskComments)

// console.table(voteToAdd)

// const [toggle, setToggle] = useState(true)
// const [modal, setModal] = useState(true)
// console.log(comments)
