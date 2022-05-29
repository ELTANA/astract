import { useState } from 'react'
import { PropTypes } from 'prop-types'
import { useFireStore } from '../../hooks/useFireStore'
import { Modal } from 'react-bootstrap'

// COMPONENTS
import AddComment from './AddComment'
import TaskComments from './TaskComment'
import { BsPencilSquare, BsTrash } from 'react-icons/bs'

// STYLES
import styles from './DashBoard.module.scss'

const TaskLists = ({ tasks }) => {
  const { deleteTaskDoc } = useFireStore('Tasks')
  // console.log(response)

  //  UPDATE TASK MODAL
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const showModal = () => setShow(true)

  // MODAL FORM STATES
  const [taskName, setTaskName] = useState('')
  const [taskCategory, setTaskCategory] = useState('')
  const [taskDeadline, setTaskDeadline] = useState('')

  // UPDATE TASK
  const updateOldTask = (e) => {
    e.preventDefault()

    //
  }

  return (
    <ul>
      {tasks.map((task) => (
        // console.log('Tasks:', task)
        <li key={task.id} className={styles.task}>
          <div className={styles.task_details}>
            <div className={styles.name_div}>
              <h2 className={styles.name}> {task.taskName}</h2>

              <span className={styles.category}>{task.taskCategory}</span>
            </div>

            {task.taskDeadline && (
              <div className={styles.deadline}>
                <p>Deadline</p>
                <span>{task.taskDeadline}</span>
              </div>
            )}

            <Modal show={show} onHide={handleClose} className={styles.update_modal}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                <form
                  onSubmit={updateOldTask}
                  className='d-flex flex-column align-items-center justify-content-about p-3'>
                  <h2 className='text-center'>Update Task</h2>
                  <label className='form-group mb-3 w-100 fs-5'>
                    <span>Task Name</span>
                    <input
                      className='form-control px-3 py-2 fs-5'
                      type='text'
                      name='taskName'
                      placeholder='Update Task Name'
                      onChange={(e) => {
                        setTaskName(e.target.value)
                      }}
                      value={taskName}
                    />
                  </label>
                  <label className='form-group mb-3 w-100 fs-5'>
                    <span>Task Category</span>
                    <input
                      className='form-control px-3 py-2 fs-5'
                      type='text'
                      name='taskCategory'
                      placeholder='Update Task Name'
                      onChange={(e) => {
                        setTaskCategory(e.target.value)
                      }}
                      value={taskCategory}
                    />
                  </label>
                  <label className='form-group mb-3 w-100 fs-5'>
                    <span>Task Deadline</span>
                    <input
                      className='form-control px-3 py-2 fs-5'
                      type='datetime-local'
                      name='taskDeadline'
                      placeholder='Update Task Deadline'
                      onChange={(e) => {
                        setTaskDeadline(e.target.value)
                      }}
                      value={taskDeadline}
                    />
                  </label>

                  <button className='btn btn-primary form-control mt-4 mb-3 py-2 fs-5'>
                    Update Task
                  </button>
                </form>
              </Modal.Body>
            </Modal>
          </div>

          <div className={styles.interactive_div}>
            <div className={styles.interactive}>
              <div className={styles.action_btns_wrapper}>
                <div className={styles.action_btns_edit}>
                  <span className={styles.action_btn}>
                    <BsPencilSquare onClick={showModal} />
                  </span>
                  <div className={styles.title}>Edit Task</div>
                </div>

                <div className={styles.action_btns_delete}>
                  <span
                    className={styles.action_btn}
                    onClick={() => {
                      deleteTaskDoc(task.id)
                    }}>
                    <BsTrash task={task} />
                  </span>

                  <div className={styles.title}>Delete Task</div>
                </div>
              </div>

              <AddComment taskId={task.id} taskComments={task.comments} />
            </div>

            <TaskComments comments={task.comments} task={task} />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TaskLists

TaskLists.propTypes = {
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
