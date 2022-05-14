import { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { useFireStore } from '../../hooks/useFireStore'

// COMPONENT IMPORTS
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import { Card, Form } from 'react-bootstrap'

// STYLES
import styles from './DashBoard.module.scss'

const TaskForm = ({ uid, displayName }) => {
  // FIRESTORE DB
  const { addTaskDoc, response } = useFireStore('Tasks')

  // TASK NAME CONTROLLLED FORM INPUTS
  const [taskName, setTaskName] = useState('')
  const onTaskNameChange = (e) => {
    setTaskName(e.target.value)
  }

  // TASK CATEGORY CONTROLLLED INPUTS
  const [taskCategory, setTaskCategory] = useState('')
  const onTaskCategoryChange = (e) => {
    setTaskCategory(e.target.value)
    //
  }

  // TASK DEADLINE CONTROLLLED INPUTS
  const [taskDeadlineValue, setTaskDeadlineValue] = useState('')
  const onTaskDeadlineChange = (e) => {
    setTaskDeadlineValue(e.target.value)

    // REFACTOR DEADLINE DATE
    let value = e.target.value
    let newValue = value.split('-')
    let year = newValue[0]
    let month = newValue[1]
    let day = newValue[2].split('T')[0]
    let currTime = newValue[2].split('T')[1]
    setTaskDeadline(`${day}/${month}/${year} by ${currTime}`)
  }

  // REFACTORED TASK DEADLINE CONTROLLLED INPUTS
  const [taskDeadline, setTaskDeadline] = useState('')

  // ADD TASK
  const handleAddTask = (e) => {
    e.preventDefault()

    addTaskDoc({
      uid: uid,
      displayName: displayName,
      taskName,
      taskCategory,
      taskDeadline
    })
  }

  useEffect(() => {
    if (response.success) {
      // console.log('useEffect ran')
      setTaskName('')
      setTaskCategory('')
      setTaskDeadlineValue('')
      // setTaskDeadline('')
    }
    // console.log('Effect:', response.success)
  }, [response.success])

  return (
    <Card body className={styles.aside_card}>
      <Card.Title className={`${styles.cardTitle} text-center`}>
        <h2>Add Task</h2>
      </Card.Title>

      <Form onSubmit={handleAddTask} className={styles.dashboard_form}>
        <InputField
          inputGroupClass='form-group mb-3'
          name='taskName'
          type='text'
          label='Task Name'
          labelClassName={styles.taskLabel}
          inputClassName={`form-control  ${styles.dashboard_input}`}
          placeholder='Enter Task Name'
          onChange={onTaskNameChange}
          value={taskName}
          required
        />
        <InputField
          inputGroupClass='form-group mb-3'
          name='taskCategory'
          type='text'
          label='Task Category'
          labelClassName={`{styles.taskLabel}`}
          inputClassName={`form-control  ${styles.dashboard_input}`}
          placeholder='Enter Task Category'
          onChange={onTaskCategoryChange}
          value={taskCategory}
          required
        />
        <InputField
          inputGroupClass='form-group mb-3'
          name='taskDeadline'
          type='datetime-local'
          label='Task Deadline'
          labelClassName={`{styles.taskLabel}`}
          inputClassName={`form-control  ${styles.dashboard_input}`}
          placeholder='Enter Task Deadline'
          onChange={onTaskDeadlineChange}
          value={taskDeadlineValue}
        />

        <Button classNames={`form-control ${styles.taskBtn}`} buttonText='Add Task' />
      </Form>
      {/* </Card.Body> */}
    </Card>
  )
}

export default TaskForm

TaskForm.propTypes = {
  uid: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired
  // uid: PropTypes.any.isRequired
}
