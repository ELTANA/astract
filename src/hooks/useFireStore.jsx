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
    case 'ADDED_COMMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null
      }
    case 'ADDED_VOTE':
      return {
        isPending: false,
        document: action.payload,
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
    case 'DELETED_COMMENT':
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

export const useFireStore = (collection, comments) => {
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
      const addedAt = timeStamp.fromDate(new Date())

      // UPDATE TASK
      const updatedTask = await ref.doc(id).update({ ...doc, addedAt })
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

  // ADD COMMENT
  const addComment = async (id, updates) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      const addedComment = await ref.doc(id).update(updates)
      dispatchIfNotCancelled({ type: 'ADDED_COMMENT', payload: addedComment })
      return addedComment
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: error.message })
      return null
    }
  }

  // DELETE COMMENT
  // const deleteComment = async (id) => {
  //   dispatch({ type: 'IS_PENDING' })

  //   try {
  //     await astractFirestore.collection(collection).doc(id).delete()
  //     dispatchIfNotCancelled({ type: 'DELETED_COMMENT' })
  //   } catch (err) {
  //     dispatchIfNotCancelled({ type: 'ERROR', payload: 'Could not delete Comment!' })
  //   }
  // }

  // DELETE COMMENT
  const deleteComment = async (id, updates) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      const deletedComment = await ref.doc(id).update({ updates: updates.arrayRemove(id) })
      dispatchIfNotCancelled({ type: 'DELETED_COMMENT', payload: deletedComment })
      return deletedComment
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: error.message })
      return null
    }
  }

  // ADD UPVOTE
  const upVote = async (id, updates) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      const addedVote = await ref.doc(id).update(updates)
      dispatchIfNotCancelled({ type: 'ADDED_VOTE', payload: addedVote })
      return addedVote
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: error.message })
      return null
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addTaskDoc, deleteTaskDoc, updateTaskDoc, addComment, deleteComment, upVote, response }
}
