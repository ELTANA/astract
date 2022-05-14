// import { Modal, Button, Form } from 'react-bootstrap'
// import InputField from '../../components/InputField'
// // import { astractFirestore } from '../../firebase/config'

// const temp = () => {
//   const { updateTaskDoc } = useFireStore

//   // TASK NAME CONTROLLLED FORM INPUTS
//   const [taskName, setTaskName] = useState('')
//   const onTaskNameChange = (e) => {
//     setTaskName(e.target.value)
//   }

//   // TASK CATEGORY CONTROLLLED INPUTS
//   const [taskCategory, setTaskCategory] = useState('')
//   const onTaskCategoryChange = (e) => {
//     setTaskCategory(e.target.value)
//     //
//   }

//   // TASK DEADLINE CONTROLLLED INPUTS
//   const [taskDeadlineValue, setTaskDeadlineValue] = useState('')
//   const onTaskDeadlineChange = (e) => {
//     setTaskDeadlineValue(e.target.value)

//     // REFACTOR DEADLINE DATE
//     let value = e.target.value
//     let newValue = value.split('-')
//     let year = newValue[0]
//     let month = newValue[1]
//     let day = newValue[2].split('T')[0]
//     let currTime = newValue[2].split('T')[1]
//     setTaskDeadline(`${day}/${month}/${year} by ${currTime}`)
//   }

//   // REFACTORED TASK DEADLINE CONTROLLLED INPUTS
//   const [taskDeadline, setTaskDeadline] = useState('')

//   //  UPDATE TASK MODAL
//   const [show, setShow] = useState(false)
//   const handleClose = () => setShow(false)
//   const showModal = () => setShow(true)

//   // UPDATE TASK
//   const updateDoc = (e) => {
//     e.preventDefault()

//     updateTaskDoc({
//       id: e.task.id,
//       taskName,
//       taskCategory,
//       taskDeadline
//     })

//     // SIGN USER UP USING IMPORTED HOOK
//     // updateTaskDoc({ email, password, passwordConfirm, displayName })
//   }

//   useEffect(() => {
//     if (response.success) {
//       // console.log('useEffect ran')
//       setTaskName('')
//       setTaskCategory('')
//       setTaskDeadlineValue('')
//       // setTaskDeadline('')
//     }
//     // console.log('Effect:', response.success)
//   }, [response.success])

//   return (
//     <div>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Modal heading</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <InputField
//             inputGroupClass='form-group mb-3'
//             name='taskName'
//             type='text'
//             label='Task Name'
//             labelClassName={styles.taskLabel}
//             inputClassName={`form-control  ${styles.dashboard_input}`}
//             placeholder='Enter Task Name'
//             onChange={onTaskNameChange}
//             value={taskName}
//             required
//           />
//           <InputField
//             inputGroupClass='form-group mb-3'
//             name='taskCategory'
//             type='text'
//             label='Task Category'
//             labelClassName={`{styles.taskLabel}`}
//             inputClassName={`form-control  ${styles.dashboard_input}`}
//             placeholder='Enter Task Category'
//             onChange={onTaskCategoryChange}
//             value={taskCategory}
//             required
//           />
//           <InputField
//             inputGroupClass='form-group mb-3'
//             name='taskDeadline'
//             type='datetime-local'
//             label='Task Deadline'
//             labelClassName={`{styles.taskLabel}`}
//             inputClassName={`form-control  ${styles.dashboard_input}`}
//             placeholder='Enter Task Deadline'
//             onChange={onTaskDeadlineChange}
//             value={taskDeadlineValue}
//           />

//           <Button classNames={`form-control ${styles.taskBtn}`} buttonText='Add Task' />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant='secondary' onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant='primary' onClick={updateDoc}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   )
// }

// export default temp
