import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import NavBar from '../../components/NavBar'

// COMPONENT IMPORTS
import { Container } from 'react-bootstrap'
import TaskForm from './TaskForm'
import TaskLists from './TaskLists'

// STYLES
import styles from './DashBoard.module.scss'

const DashBoard = () => {
  // STATES & Funcs FROM useSignUp Hook
  const { user } = useAuthContext()
  const { displayName } = user // User's Details

  // const { displayName, uid } = user // User's Details
  // console.log('Dashboard:', user.displayName)
  // const { tasks, error } = useCollection(
  //   'Tasks'
  //   ) //TaskLists for all users

  // //TaskLists for ALL USERS(ADMIN ACCESS)
  // const { tasks, error } = useCollection('Tasks', null, ['createdAt', 'desc'])

  //TaskLists for A PARTICULAR USER
  const { tasks, error } = useCollection('Tasks', ['uid', '==', user.uid], ['createdAt', 'desc'])

  return (
    <>
      <NavBar
        userName={user.displayName}
        linkOneClassName={`nav_link`}
        linkTwoClassName={`nav_link active`}
      />

      <section className={styles.dashboard_container}>
        <Container>
          <section className={styles.dashboard}>
            <article>
              {tasks && <h1>{displayName}&apos;s Tasks</h1>}
              <div className={styles.tasks}>
                {error && <p>{error}</p>}
                {tasks && <TaskLists tasks={tasks} />}
              </div>
            </article>
            <aside>
              <TaskForm uid={user.uid} displayName={user.displayName} />
            </aside>
          </section>
        </Container>
      </section>
    </>
  )
}

export default DashBoard
