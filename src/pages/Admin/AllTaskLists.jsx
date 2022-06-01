import { useEffect } from 'react'
import { PropTypes } from 'prop-types'

// ANIMATE ON SCROLL
import AOS from 'aos'
import 'aos/dist/aos.css'

// COMPONENTS
import { FiFolderPlus } from 'react-icons/fi'
import { BiCategory } from 'react-icons/bi'
import { MdTimer } from 'react-icons/md'

// STYLES
import styles from './Admin.module.scss'
import { RiChatOffLine } from 'react-icons/ri'
import AddComment from './AdminAddCommments'
import AdminTaskComments from './AdminTaskComments'

const AllTaskLists = ({ tasks }) => {
  // ANIMATE ON SCROLL
  useEffect(() => {
    AOS.init()
    AOS.refresh()
  }, [])

  return (
    <ul className={styles.task_list} data-aos='fade-up'>
      {tasks.map((task) => (
        <li key={task.id} className={styles.task}>
          <h2 className={styles.task_title} data-aos='fade-up'>
            {task.taskName}
          </h2>

          <div className={styles.task_details}>
            <div className={styles.details}>
              {task.displayName && (
                <div className={styles.creator} data-aos='fade-up' data-aos-delay='100'>
                  <FiFolderPlus />
                  <span> {task.displayName}</span>
                </div>
              )}

              <div className={styles.category} data-aos='fade-up' data-aos-delay='200'>
                <BiCategory />
                <span>{task.taskCategory}</span>
              </div>

              {task.taskDeadline && (
                <div className={styles.deadline} data-aos='fade-up' data-aos-delay='300'>
                  <MdTimer />
                  <span>{task.taskDeadline}</span>
                </div>
              )}
            </div>

            <>
              {task.comments && <AddComment taskId={task.id} taskComments={task.comments} />}
              {!task.comments ? (
                <span data-aos='fade-up' data-aos-delay='500'>
                  Deprecated Task
                </span>
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
                    <AdminTaskComments
                      data-aos='fade-up'
                      data-aos-delay='500'
                      comments={task.comments}
                      task={task}
                    />
                  )}
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
