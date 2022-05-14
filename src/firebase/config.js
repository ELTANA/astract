import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDvjNWVMcr2LFlg_cbsSbR0r0a7i8xgZaM',
  authDomain: 'astractapp.firebaseapp.com',
  projectId: 'astractapp',
  storageBucket: 'astractapp.appspot.com',
  messagingSenderId: '875713215366',
  appId: '1:875713215366:web:26325028d61ea045a70a07'
}

// INITIALIZE FIREBASE
firebase.initializeApp(firebaseConfig)

// INITIALIZE SERVICES & EXPORT
const astractFirestore = firebase.firestore()
const astractAuth = firebase.auth()

// TIME STAMP
const timeStamp = firebase.firestore.Timestamp

// const timeStamp = firebase.firestore.FieldValue.serverTimestamp()

export { astractFirestore, astractAuth, timeStamp }
