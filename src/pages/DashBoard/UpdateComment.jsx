import { useState } from 'react'
import PropTypes from 'prop-types'

// COMPONENTS
import { FaRegEdit } from 'react-icons/fa'
import { VscClose } from 'react-icons/vsc'
import { MdCheck } from 'react-icons/md'

// STYLES
import styles from './DashBoard.module.scss'
import { astractFirestore } from '../../firebase/config'

const UpdateComment = ({ comments, task, content, id }) => {
  const [commentsId, setCommentsId] = useState('')
  const [updateDiv, setUpdateDiv] = useState(false)
  const [updateInput, setUpdateInput] = useState(false)
  const onUpdateInputChange = (e) => {
    setUpdateInput(e.target.value)
  }
  // console.log(content)

  const handleUpdateComment = () => {
    const update = async () => {
      const res = await astractFirestore
        .collection('Tasks')
        .doc(commentsId)
        .update({
          comments: {
            content: updateInput
          }
        })
      // console.log('update')

      // if (res) {
      setUpdateDiv(false)
      setUpdateInput('')
      // }
    }
    return update()
  }

  return (
    <>
      <span
        className={styles.edit_comment}
        onClick={() => {
          setUpdateDiv((prevState) => !prevState)
          setUpdateInput(content)
          setCommentsId(id)
          // setCommentsId(task.id)
          // console.log(commentsId)
          console.log(content)
        }}>
        <FaRegEdit />
      </span>
      {updateDiv && (
        <label className={styles.updateComment}>
          <textarea
            name='updateComment'
            cols='30'
            rows='1'
            minLength={5}
            onChange={onUpdateInputChange}
            value={updateInput}
            required></textarea>
          <MdCheck
            className={styles.update_btn_edit}
            onClick={() => {
              handleUpdateComment
            }}
          />
          <VscClose
            className={styles.update_btn_close}
            onClick={() => {
              setUpdateDiv(false)
              setUpdateInput('')
            }}
          />
        </label>
      )}
    </>
  )
}

export default UpdateComment

UpdateComment.propTypes = {
  comment: PropTypes.object,
  comments: PropTypes.array,
  task: PropTypes.object,
  content: PropTypes.string,
  displayName: PropTypes.string,
  createdAt: PropTypes.object,
  id: PropTypes.string
  // comments: PropTypes.array,
  // key: PropTypes.string,
  // vote: PropTypes.number,
}
