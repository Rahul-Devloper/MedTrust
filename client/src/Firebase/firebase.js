// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getStorage } from 'firebase/storage' // Import Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDc1RK4D3tuLqimDpyJ54khqBdiGgOT-LA',
  authDomain: 'medtrust-1b6f8.firebaseapp.com',
  projectId: 'medtrust-1b6f8',
  storageBucket: 'medtrust-1b6f8.appspot.com',
  messagingSenderId: '854025236935',
  appId: '1:854025236935:web:a9a8a89dcc1b167fe3a9e2',
  measurementId: 'G-B7PQ9HXM1V',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

// Initialize Firebase Storage
const storage = getStorage(app)

// Export the app and the storage
export { app, storage }
