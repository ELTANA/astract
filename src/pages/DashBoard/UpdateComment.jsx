import { useState } from 'react'

// COMPONENTS
import { FaRegEdit } from 'react-icons/fa'
import { VscClose } from 'react-icons/vsc'
import { MdCheck } from 'react-icons/md'

// STYLES
import styles from './DashBoard.module.scss'

const UpdateComment = () => {
  const [updateDiv, setUpdateDiv] = useState(false)
  return (
    <>
      <span
        className={styles.edit_comment}
        onClick={() => {
          // console.log(comment)
          setUpdateDiv((prevState) => !prevState)
        }}>
        <FaRegEdit />
      </span>
      {updateDiv && (
        <label className={styles.updateComment}>
          <textarea name='updateComment' cols='30' rows='1' minLength={5} required></textarea>
          <MdCheck className={styles.update_btn_edit} />
          <VscClose
            className={styles.update_btn_close}
            onClick={() => {
              setUpdateDiv(false)
            }}
          />
        </label>
      )}
    </>
  )
}

export default UpdateComment
