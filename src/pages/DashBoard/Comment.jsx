import PropTypes from 'prop-types'

// COMPONENETS
import { RiChatNewLine } from 'react-icons/ri'
import { BsTrash } from 'react-icons/bs'
import { BiDownvote, BiUpvote } from 'react-icons/bi'

// STYLES
import styles from './DashBoard.module.scss'
import { useState } from 'react'

const Comment = ({ content, displayName, createdAt, id }) => {
  const [voteCount, setVoteCount] = useState(0)

  const handleUpVote = () => {
    setVoteCount((prevState) => parseInt(prevState) + 1)
  }

  const handleDownVote = () => {
    setVoteCount((prevState) => {
      if (parseInt(prevState) == 0) {
        return 0
      } else {
        return parseInt(prevState) - 1
      }
    })
  }

  return (
    <div className={styles.comment}>
      <div className={styles.comment_container}>
        <div className={styles.comment_content}>
          <p>
            <span>“</span>
            {content}
            <span>”</span>
          </p>
        </div>

        <div className={styles.comment_details}>
          <span className={styles.comment_name}>
            <span className={styles.comment_icon}>
              <RiChatNewLine />
            </span>
            {`by ${displayName}`}
          </span>

          <span className={styles.comment_time}>
            {` at 
                  ${createdAt.toDate().toLocaleTimeString()} on 
                  ${createdAt.toDate().toDateString()}`}
          </span>

          <span
            className={styles.delete_comment}
            onClick={() => {
              console.log(id)
            }}>
            <BsTrash />
          </span>
        </div>
      </div>

      <div className={styles.vote}>
        <span className={styles.vote_btn} onClick={handleUpVote}>
          <BiUpvote />
        </span>

        <span
          className={`${styles.vote_count} ${
            voteCount > 0 ? styles.positive : voteCount < 0 ? styles.negative : null
          }`}>
          {voteCount}
          {/* {voteCount ? voteCount : 0} */}
        </span>

        <span className={styles.vote_btn} onClick={handleDownVote}>
          <BiDownvote />
        </span>
      </div>
    </div>
  )
}

export default Comment

Comment.propTypes = {
  content: PropTypes.string,
  displayName: PropTypes.string,
  createdAt: PropTypes.object,
  id: PropTypes.string
  // key: PropTypes.string,
  // vote: PropTypes.number,
  // comments: PropTypes.array,
}

// <div key={comment.id} className={styles.comment}>
//   <div className={styles.comment_container}>
//     <div className={styles.comment_content}>
//       <p>
//         <span>“</span>
//         {comment.content}
//         <span>”</span>
//       </p>
//     </div>

//     <div className={styles.comment_details}>
//       <span className={styles.comment_name}>
//         <span className={styles.comment_icon}>
//           <RiChatNewLine />
//         </span>
//         {`by ${comment.displayName}`}
//       </span>

//       <span className={styles.comment_time}>
//         {` at
//               ${comment.createdAt.toDate().toLocaleTimeString()} on
//               ${comment.createdAt.toDate().toDateString()}`}
//       </span>

//       <span
//         className={styles.delete_comment}
//         onClick={() => {
//           console.log(comment.id)
//         }}>
//         <BsTrash />
//       </span>
//     </div>
//   </div>

//   <div className={styles.vote}>
//     <span className={styles.vote_btn} onClick={handleUpVote}>
//       <BiUpvote />
//     </span>

//     <span
//       className={`${styles.vote_count} ${
//         voteCount > 0 ? styles.positive : voteCount < 0 ? styles.negative : null
//       }`}>
//       {voteCount}
//       {/* {comment.voteCount ? comment.voteCount : 0} */}
//     </span>

//     <span className={styles.vote_btn} onClick={handleDownVote}>
//       <BiDownvote />
//     </span>
//   </div>
// </div>
