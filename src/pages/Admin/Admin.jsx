import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import NavBar from '../../components/NavBar'
import { Container } from 'react-bootstrap'
import AllTaskLists from './AllTaskLists'

// STYLES
import styles from './Admin.module.scss'

function Admin() {
  const { user } = useAuthContext()
  // console.log(user)

  // //TaskLists for ALL USERS(ADMIN ACCESS)
  const { tasks, error } = useCollection('Tasks', null, ['createdAt', 'desc'])
  // console.log('tasks:', tasks)
  // console.log('error:', error)

  return (
    <>
      <NavBar
        userName={user.displayName}
        linkOneClassName={`nav_link active`}
        linkTwoClassName={`nav_link`}
      />
      <section className={styles.admin_container}>
        <Container>
          <h1 className='text-center'>Admin Dashboard</h1>
          <section className={styles.adminboard}>
            <article>
              <div className={styles.task_list}>{tasks && <AllTaskLists tasks={tasks} />}</div>
            </article>

            {/* <aside>Aside</aside> */}
          </section>
        </Container>
      </section>
    </>
  )
}

export default Admin
