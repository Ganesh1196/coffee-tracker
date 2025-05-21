import { useState } from "react"
import Authentication from "./Authentication"
import Modal from "./Modal"
import { useAuth } from "../context/AuthContext"

export default function Layout(props){ 
  //This is the layout that will be used for header and footer and will be rendered accross any page we want
const { children } = props
const { globalUser, logout } = useAuth()

const [ showModal, setShowModal ] = useState(false)
 //header is defined here
  const header = (
    <header>
      <div>
        <h1 className="text-gradient">CAFFIEND</h1>
        <p>For Coffee Insatiates</p>
      </div>
      {globalUser ? (<button onClick={()=>logout()}>
        <p>Logout</p>
      </button>) : (<button onClick={()=>setShowModal(true)}>
        <p>Sign up free</p>
        <i className="fa-solid fa-mug-hot"></i>
      </button>)}
    </header>
  )
//footer is defined here
  const footer = (
    <footer>
      <p>Caffiend was made by <a target="_blank" href="https://github.com/Ganesh1196?tab=repositories">Ganesh</a></p>
    </footer>
  )
  function handleCloseModal(){
    setShowModal(false)
  }

  return(
    <>
     {showModal && (<Modal handleCloseModal={handleCloseModal}> {/**This is the modal where authentication page is displayed */}
        <Authentication handleCloseModal={handleCloseModal} />
      </Modal>)}
    {header}
    <main>
      { children }
    </main>
    {footer}
    
    </>
  )
}