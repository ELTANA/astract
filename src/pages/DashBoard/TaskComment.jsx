import { RiChatNewLine } from 'react-icons/ri'
import { useState } from 'react'
import { GoCommentDiscussion } from 'react-icons/go'

// STYLES
import styles from './DashBoard.module.scss'

const TaskComments = () => {
  const [toggle, setToggle] = useState(true)
  const [modal, setModal] = useState(true)

  const toggleComments = () => {
    setToggle((prevState) => !prevState)
  }

  const showModal = () => {
    setModal((prevState) => !prevState)
  }

  return (
    <div className={styles.task_comments}>
      <div className={styles.comment_toggle__btn}>
        <span>Toggle Comments</span>
        <span className={styles.toggle_btn}>
          <GoCommentDiscussion onClick={toggleComments} />
        </span>
      </div>

      <div className={styles.comments}>
        <div className={styles.comment}>
          <p>
            Lorem ipsum dolor sit amet elit ametcur consectetur adipisicing elit. Voluptate, est?
          </p>
          <span className={styles.toggle_comment_btn}>
            <RiChatNewLine onClick={showModal} />
          </span>
        </div>

        <div className={styles.comment}>
          <p>
            Lorem ipsum dolor sit amet elit ametcur consectetur adipisicing elit. Voluptate, est?
          </p>
          <span className={styles.toggle_comment_btn}>
            <RiChatNewLine onClick={showModal} />
          </span>
        </div>

        <div className={styles.comment}>
          <p>
            Lorem ipsum dolor sit amet elit ametcur consectetur adipisicing elit. Voluptate, est?
          </p>
          <span className={styles.toggle_comment_btn}>
            <RiChatNewLine onClick={showModal} />
          </span>
        </div>

        <div className={styles.comment}>
          <p>
            Lorem ipsum dolor sit amet elit ametcur consectetur adipisicing elit. Voluptate, est?
          </p>
          <span className={styles.toggle_comment_btn}>
            <RiChatNewLine onClick={showModal} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default TaskComments
