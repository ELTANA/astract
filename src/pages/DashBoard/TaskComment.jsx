import PropTypes from 'prop-types'
import { useFireStore } from '../../hooks/useFireStore'

// COMPONENTS
import Comment from './Comment'
import { GoCommentDiscussion } from 'react-icons/go'
import { RiChatOffLine } from 'react-icons/ri'

// STYLES
import styles from './DashBoard.module.scss'
import { useState } from 'react'

const TaskComments = ({ task, comments }) => {
  const [toggleComments, setToggleComments] = useState(true)

  return (
    <>
      {!comments ? (
        <span>Deprecated Task</span>
      ) : (
        <div className={styles.task_comments}>
          {comments.length < 1 ? (
            <div className={styles.comment_toggle__btn}>
              <span>No Comments</span>
              <span className={styles.toggle_btn}>
                <RiChatOffLine />
              </span>
            </div>
          ) : (
            <>
              <div
                className={styles.comment_toggle__btn}
                onClick={() => {
                  setToggleComments((prevState) => !prevState)
                }}>
                <span>Toggle Comments</span>
                <span className={styles.toggle_btn}>
                  <GoCommentDiscussion />
                </span>
              </div>

              {toggleComments &&
                comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    content={comment.content}
                    displayName={comment.displayName}
                    createdAt={comment.createdAt}
                    id={comment.id}
                    comment={comment}
                    task={task}
                  />
                ))}
            </>
          )}
        </div>
      )}
    </>
  )
}

export default TaskComments

TaskComments.propTypes = {
  vote: PropTypes.number,
  comments: PropTypes.array,
  task: PropTypes.object
}
