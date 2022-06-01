import { useState } from 'react'
import PropTypes from 'prop-types'
import { astractFirestore } from '../../firebase/config'

// COMPONENTS
import { FaRegEdit } from 'react-icons/fa'
import { VscClose } from 'react-icons/vsc'
import { MdCheck } from 'react-icons/md'

// STYLES
import styles from './Admin.module.scss'

const AdminUpdateComment = ({ comments, task, content, id }) => {
  const [commentsId, setCommentsId] = useState('')
  const [updateDiv, setUpdateDiv] = useState(false)
  const [updateInput, setUpdateInput] = useState(false)
  const onUpdateInputChange = (e) => {
    setUpdateInput(e.target.value)
  }

  const handleUpdateComment = () => {
    setUpdateDiv(false)
    setUpdateInput('')
    // const update = async () => {
    //   console.log(task.id)
    //   const res = await astractFirestore
    //     .collection('Tasks')
    //     .doc(task.id)
    //     .update({ comments: [...comments, { content: updateInput }] })
    // }
    // update()
    // if (update) {
    // setUpdateDiv(false)
    // setUpdateInput('')
    // console.log('edited')
    // }
  }

  return (
    <>
      <span
        data-aos='fade-up'
        data-aos-delay='100'
        className={styles.edit_comment}
        onClick={() => {
          setUpdateDiv((prevState) => !prevState)
          setUpdateInput(content)
          setCommentsId(id)
        }}>
        <FaRegEdit />
      </span>
      {updateDiv && (
        <label className={styles.updateComment} data-aos='fade-up'>
          <textarea
            data-aos='fade-up'
            name='updateComment'
            cols='30'
            rows='1'
            minLength={5}
            onChange={onUpdateInputChange}
            value={updateInput}
            required></textarea>

          <MdCheck
            className={styles.update_btn_edit}
            onClick={handleUpdateComment}
            data-aos='fade-up'
            data-aos-delay='100'
          />

          <VscClose
            className={styles.update_btn_close}
            onClick={() => {
              setUpdateDiv(false)
              setUpdateInput('')
            }}
            data-aos='fade-up'
            data-aos-delay='200'
          />
        </label>
      )}
    </>
  )
}

export default AdminUpdateComment

AdminUpdateComment.propTypes = {
  comment: PropTypes.object,
  comments: PropTypes.array,
  task: PropTypes.object,
  content: PropTypes.string,
  displayName: PropTypes.string,
  createdAt: PropTypes.object,
  id: PropTypes.string
}
