import { useReducer, useEffect, useState } from 'react'
import { astractFirestore, timeStamp } from '../firebase/config'

let initialTaskState = {
  document: null,
  isPending: false,
  error: null,
  success: null
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return {
        // ...state,
        document: null,
        isPending: true,
        success: false,
        error: null
      }
    case 'ADDED_TASK':
      return {
        // ...state,
        document: action.payload,
        isPending: false,
        success: true,
        error: null
      }
    case 'UPDATED_TASK':
      return {
        // ...state,
        document: action.payload,
        isPending: false,
        success: true,
        error: null
      }
    case 'DELETED_TASK':
      return {
        // ...state,
        isPending: false,
        document: null,
        success: true,
        error: null
      }
    case 'ERROR':
      return {
        document: null,
        isPending: false,
        success: false,
        error: action.payload
      }
    //
    default:
      return state
  }
}

export const useFireStore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialTaskState)
  const [isCancelled, setIsCancelled] = useState(false)

  //COLLECTION REFRENCE
  const ref = astractFirestore.collection(collection)

  // DISPATCH IF NOT CANCELLED
  const dispatchIfNotCancelled = (action) => {
    if (isCancelled) {
      dispatch(action)
    }
    // To prevent dispatch for a mounted component
  }

  // ADD TASK DOCUMENT
  const addTaskDoc = async (doc) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      // ADD TIME STAMP
      const createdAt = timeStamp.fromDate(new Date())

      // ADD CREATED TASK
      const addedTask = await ref.add({ ...doc, createdAt })
      dispatchIfNotCancelled({
        type: 'ADDED_TASK',
        payload: addedTask
      })
      //
    } catch (err) {
      dispatchIfNotCancelled({
        type: 'ERROR',
        payload: err.message
      })
    }
  }

  // DELETE TASK DOCUMENT
  const deleteTaskDoc = async (id) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      await ref.doc(id).delete()
      dispatchIfNotCancelled({ type: 'DELETED_TASK' })
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'Could not delete Task!' })
    }
  }

  // UPDATE TASK DOCUMENT
  const updateTaskDoc = async (id, doc) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      // ADD TIME STAMP
      const updatedAt = timeStamp.fromDate(new Date())

      // UPDATE TASK
      const updatedTask = await ref.doc(id).update({ ...doc, updatedAt })
      dispatchIfNotCancelled({
        type: 'UPDATED_TASK',
        payload: updatedTask
      })
      //
    } catch (err) {
      dispatchIfNotCancelled({
        type: 'ERROR',
        payload: err.message
      })
      return null
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addTaskDoc, deleteTaskDoc, updateTaskDoc, response }
}
