import { useState } from 'react'
import { PropTypes } from 'prop-types'
// import { useFireStore } from '../../hooks/useFireStore'

// COMPONENTS
import { FiFolderPlus } from 'react-icons/fi'
import { BiCategory } from 'react-icons/bi'
import { MdTimer } from 'react-icons/md'

// STYLES
import styles from './Admin.module.scss'
import { RiChatOffLine } from 'react-icons/ri'
import AddComment from './AdminAddCommments'
import AdminTaskComments from './AdminTaskComments'
// import AdminComments from './AdminComments'
// import { GoCommentDiscussion } from 'react-icons/go'

const AllTaskLists = ({ tasks }) => {
  const [toggleComments, setToggleComments] = useState(true)

  return (
    <ul className={styles.task_list}>
      {tasks.map((task) => (
        <li key={task.id} className={styles.task}>
          <h2 className={styles.task_title}> {task.taskName}</h2>

          <div className={styles.task_details}>
            <div className={styles.details}>
              {task.displayName && (
                <div className={styles.creator}>
                  <FiFolderPlus />
                  <span> {task.displayName}</span>
                </div>
              )}

              <div className={styles.category}>
                <BiCategory />
                <span>{task.taskCategory}</span>
              </div>

              {task.taskDeadline && (
                <div className={styles.deadline}>
                  <MdTimer />
                  <span>{task.taskDeadline}</span>
                </div>
              )}
            </div>

            <>
              {task.comments && <AddComment taskId={task.id} taskComments={task.comments} />}
              {!task.comments ? (
                <span>Deprecated Task</span>
              ) : (
                <div className={styles.task_comments}>
                  {task.comments.length < 1 ? (
                    <div className={styles.comment_toggle__btn}>
                      <span>No Comments</span>
                      <span className={styles.toggle_btn}>
                        <RiChatOffLine />
                      </span>
                    </div>
                  ) : (
                    <AdminTaskComments comments={task.comments} task={task} />

                    // <div
                    //   className={styles.comment_toggle__btn}
                    //   onClick={() => setToggleComments((prevState) => !prevState)}>
                    //   <span>Toggle Comments</span>
                    //   <span className={styles.toggle_btn}>
                    //     <GoCommentDiscussion />
                    //   </span>
                    // </div>
                  )}

                  {/* {toggleComments &&
                    task.comments.map((comment) => (
                      <AdminComments
                        key={comment.id}
                        content={comment.content}
                        displayName={comment.displayName}
                        createdAt={comment.createdAt}
                        id={comment.id}
                        comment={comment}
                      />
                    ))} */}
                </div>
              )}
            </>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default AllTaskLists

AllTaskLists.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string.isRequired,
      taskName: PropTypes.string.isRequired,
      taskCategory: PropTypes.string.isRequired,
      taskDeadline: PropTypes.string
    })
  )
}
// .propTypes = {
//   linkText: PropTypes.string,
//   onSubmit: PropTypes.func.isRequired,
//   children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
// }
