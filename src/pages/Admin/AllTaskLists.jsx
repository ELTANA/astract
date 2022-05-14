// import { useState } from 'react'
import { PropTypes } from 'prop-types'
// import { useFireStore } from '../../hooks/useFireStore'

// STYLES
import styles from './Admin.module.scss'

const AllTaskLists = ({ tasks }) => {
  // console.log('tasks:', tasks)
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <div className={styles.details}>
            {task.displayName && (
              <div className={styles.name}>
                <span className={styles.span_title}>Creator</span>
                <span> {task.displayName}</span>
              </div>
            )}

            {task.taskDeadline && (
              <div className={styles.deadline}>
                <span className={styles.span_title}>Deadline</span>
                <span>{task.taskDeadline}</span>
              </div>
            )}
          </div>

          <div className={styles.title_div}>
            <h2 className={styles.title}> {task.taskName}</h2>
            <span className={styles.category}>{task.taskCategory}</span>
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
