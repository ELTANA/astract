import { useEffect, useRef, useState } from 'react'
import { astractFirestore } from '../firebase/config'

export const useCollection = (collection, _query, _reOrderTasks) => {
  const [tasks, setTasks] = useState(null)
  const [error, setError] = useState(null)

  // To PREVENT AN INFINITE LOOP, I WRAP THE QUERY IN A useRRef HOOK
  const query = useRef(_query).current
  const reOrderTasks = useRef(_reOrderTasks).current

  useEffect(() => {
    let ref = astractFirestore.collection(collection)

    // CHECK FOR uid AND DISPLAY TASKS FOR A PARTICULAR USER
    if (query) {
      ref = ref.where(...query)
    }

    // TO REODER TASKS DISPLAYED FOR A USER
    if (reOrderTasks) {
      ref = ref.orderBy(...reOrderTasks)
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let taskLists = []
        snapshot.docs.forEach((doc) => {
          taskLists.push({ ...doc.data(), id: doc.id })
        })
        // UPDATE STATE
        setTasks(taskLists)
        setError(null)
      },
      (error) => {
        // This console.error is IMPORTANT TO CREATE CREATE INDEX
        // console.error(error.message)

        setError('Could not Fetch the Data!')
      }
    )

    // UNSUBSCRIBE ON UNMOUNT
    return () => unsubscribe()
    //
  }, [collection, query, reOrderTasks])
  //
  return { tasks, error }
}
