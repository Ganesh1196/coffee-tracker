//We define all the global states here that can be accessed anywhere in the app and this is on the top of heirarchy

import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { createContext, useEffect, useState, useContext } from "react"
import { auth, db } from "../../firebase"
import { doc, getDoc } from "firebase/firestore"

const AuthContext = createContext()

export function useAuth() { 
  return useContext(AuthContext)
}

export function AuthProvider(props){
  const { children } = props
  const [globalUser, setGlobalUser] = useState(null)
  const [globalData, setGlobalData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  
//This function will do the authentication for the user email and password signup
  function signup(email, password){
    return createUserWithEmailAndPassword(auth, email, password)//this is a inherited firebase function
  }

//This funtion will do the login authentication for the user
function login(email, password){
  return signInWithEmailAndPassword(auth, email, password)//this is a inherited firebase function
}

//Handles password reset
function resetPassword(email){
  return sendPasswordResetEmail(auth, email)
}

//THis function will handle logout
function logout(){
  setGlobalUser(null)
  setGlobalData(null)
  return signOut(auth)//firebase funtion
}
  const value = { globalUser, globalData, setGlobalData, isLoading, signup, login, logout }
  
useEffect(()=>{
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    console.log("CURRENT USER: ", user)
    setGlobalUser(user)
    // if there's no user, empty the user state and return from this listener
    
    if (!user) {
      console.log("No active user")
      return}
    // if there is a user, then check if the user has data in the database, and if they do, then
    // fetch the said data and update the global state
    try {
      setIsLoading(true)

      //first we create a reference for the document (labbelled json object), and then we get the doc, and then we snapshot it to see if there's anything there
      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)

      let firebaseData = {}
      if (docSnap.exists()) {
        firebaseData = docSnap.data()
        console.log("Found user data", firebaseData)
      }
      setGlobalData(firebaseData)
    } catch (err) {
      console.log(err.message)
    } finally{
      setIsLoading(false)
    }
  })
  return unsubscribe
}, [])
  
  return(
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
  )
}
//All of this is rendered in main.jsx