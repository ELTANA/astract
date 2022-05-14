import { Link } from 'react-router-dom'

import styles from './Home.module.scss'
// import HomeImg from '../../assets/images/home_alt.svg'
// import HomeImg from '../../assets/images/svg.svg'
import HomeImg from '../../assets/images/task_sheet_alt.svg'

const Home = () => {
  return (
    <main className={`${styles.home_container}`}>
      <section className={`${styles.home_section}`}>
        <article className={`${styles.home_article} `}>
          <h4 className={`${styles.home_article_text} `}>Welcome to My</h4>
          <h1 className={`${styles.home_article_title} `}>Astract App</h1>
        </article>
        <img className={`${styles.home_img}`} src={HomeImg} alt='image' />
        <div className={`${styles.home_btn_div}`}>
          <Link className={`${styles.home_btn} ${styles.home_btn} ${styles.btn_su}`} to='/signup'>
            Sign Up
          </Link>
          <Link className={`${styles.home_btn} ${styles.home_btn} ${styles.btn_li}`} to='/login'>
            Log In
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Home
