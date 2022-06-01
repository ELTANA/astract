import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import styles from './Admin.module.scss'
import { BiUpvote, BiDownvote } from 'react-icons/bi'

const Count = () => {
  const [voteCount, setVoteCount] = useState(0)

  const handleUpVote = () => {
    useEffect(
      () =>
        setVoteCount((prevState) => {
          parseInt(prevState) + 1
        }),
      voteCount
    )
  }

  const handleDownVote = () => {
    //
  }

  return (
    <div className={styles.vote}>
      <span className={styles.vote_btn} onClick={handleUpVote}>
        <BiUpvote />
      </span>

      <span
        className={`${styles.vote_count} ${
          voteCount >= 3
            ? styles.positive
            : voteCount < 3 && voteCount !== 0
            ? styles.negative
            : null
        }`}>
        <span className={styles.slide}>{voteCount}</span>
      </span>

      <span className={styles.vote_btn} onClick={handleDownVote}>
        <BiDownvote />
      </span>
    </div>
  )
  // return <div style={styles.countValue}>{count}</div>
}

export default Count

Count.propTypes = {
  count: PropTypes.number
}
