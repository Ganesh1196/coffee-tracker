import { useState } from "react"
import { useAuth } from "../context/AuthContext"

export default function Authentication(props){

  const { userName, setUserName, handleCloseModal} = props
  
  const [ isRegistration, setIsRegistration ] = useState(false) //(False: User Registered | True: New User)To understand whether the user is signing in or signing up?
  
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ isAuthenticating, setIsAuthenticating ] = useState(false)
  const [ error, setError] = useState(null)// THis state is to get error message  in the handleAuthentication function so that the message can be displayed
  const { signup, login } = useAuth() //These are the global states that we are accessing from AuthContext 
  
  async function handleAuthenicate(){
    if(!email || !email.includes("@") || !password || password.length < 6 || isAuthenticating) {console.log("RETURNING")
       return alert("Please enter valid values: Email should contain @ | Password should be more than 6 characters")}

    try {
      setIsAuthenticating(true)
      setError(null)
      if (isRegistration){
        //register a user
      await signup (email, password)
    }
    else {
      //login a user
      await login (email, password)
    }
    handleCloseModal()
      
    } catch (error) {
      console.log("Error ", error.message)
      setError(error.message)
    } finally{
      setIsAuthenticating(false)
    }

    
  }

  return(
    <>
    <h2 className="sign-up-text">{isRegistration ? "Sign Up" : "Login"}</h2>
    <p>{ isRegistration ? "Create an account!" : "Sign in to your account!"}</p>
    {error && (
      <p>❌{error}</p>
    )}
    <input type="text"  value={userName} onChange={(e) => {setUserName(e.target.value)}} placeholder="Name"/>
    <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder="Email" />
    <input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="********" />
    <button onClick={()=> handleAuthenicate( console.log("Button Clicked")) }><p>{ isAuthenticating ? "Authenticating...." : "Submit"}</p></button>
    <hr />
    <div className="register-content">
      <p>{isRegistration ? "Already have an account?" : "Don\'t have an account?"}</p>
      <button onClick={()=> {setIsRegistration(!isRegistration)}}>
        <p>{isRegistration ? "Sign In" : "Sign Up"}</p></button>
    </div>
    </>
  )
}