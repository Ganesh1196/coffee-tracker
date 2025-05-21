
import { useState } from "react"
import {coffeeOptions} from "../utils"
import Modal from "./Modal"
import Authentication from "./Authentication"
import { useAuth } from "../context/AuthContext"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../firebase"

export default function CoffeeForm(props){

  const { isAuthenticated } = props
  const [ userName, setUserName ] = useState("")
  const [ selectedCoffee, setSelectedCoffee] = useState(null)
  const [ showCoffeeTypes, setShowCoffeeTypes] = useState(false)
  const [ coffeeCost, setCoffeeCost ] = useState(0)
  const [ hour, setHour ] = useState(0)
  const [ min, setMin ] = useState(0)
  const [ showModal, setShowModal ] = useState(false)
  
  const { globalData, setGlobalData, globalUser} = useAuth()
  console.log("Selected Coffee " + selectedCoffee)
  
  async function handleSubmitForm(){
    if(!isAuthenticated){
      setShowModal(true)
      return
    }

    // define a guard clause that only submits the form if it is completed
    if (!selectedCoffee) {
      return
    }
    // then we're going to create a new data object (As states are immutable we will override the state)
    const newGlobalData = {
      ...(globalData || {})
    }

    try {
      const nowTime = Date.now()

    const timeToSubtract = (hour * 60 * 60 * 1000) + (min * 60 * 100) //converts time to milliseconds
    const timeStamp = nowTime - timeToSubtract
    const newData = {
        name: selectedCoffee,
        cost: coffeeCost
      }

    newGlobalData[timeStamp] = newData
    //new data that user input
    console.log(timeStamp, selectedCoffee ,coffeeCost)

    // update the global state
    setGlobalData(newGlobalData)
    // persist the data in the firebase firestore
    const userRef = doc(db, "users", globalUser.uid)
    const res = await setDoc(userRef, {
      [timeStamp]:newData
    }, {merge: true})

    setSelectedCoffee(null)
    hour(0)
    min(0)
    coffeeCost(0)

    } catch (error) {
      console.log(error.message)
    }
    
  }
    function handleCloseModal(){
    setShowModal(false)
  }
  return(
    <>
      {/**The duplicate of this also consists in the Layout component */}
      {showModal && (<Modal handleCloseModal={handleCloseModal}> {/**This is the modal where authentication page is displayed */}
              <Authentication userName={userName} setUserName={setUserName} handleCloseModal={handleCloseModal}/>
            </Modal>)}
        <h1>Hi {console.log(userName)+ userName}!</h1>
    <div className="section-header">
      
      <i className="fa-solid fa-pencil" />
      <h2>Start Tracking Today</h2>
    </div>
    <h4>Select coffee type</h4>
    <div className="coffee-grid">
      {coffeeOptions.slice(0, 5).map((option, optionIndex)=>{
       return (
          <button onClick={()=>{
            //setting the selected coffee to the use state when the coffee is selected
            setSelectedCoffee(option.name)
            setShowCoffeeTypes(false)
          }} className={/*this is for styling when the button is selected it will stay highlighted*/"button-card "+ (option.name===selectedCoffee ? " coffee-button-selected" : "")} key={optionIndex}>
            <h4>{option.name}</h4>
            <p>{option.caffeine} mg</p>
            
          </button>
        )
      })}
      <button onClick={()=>{
        //setting show coffee type true so that the select option for all the coffee types will be shown once this button is clicked
        setShowCoffeeTypes(true)
        setSelectedCoffee(null)
      }} className={"button-card "+ (showCoffeeTypes ? " coffee-button-selected" : "")}>
        <h4>Other</h4>
        <p>n/a</p>
      </button>
    </div>
    {/**the && below is for the condition that if showCoffeeTypes is true hence the select component will be shown */}
    {showCoffeeTypes && (
      <select onChange={(e)=>{setSelectedCoffee(e.target.value)}} name="coffee-list" id="coffee-list">
      <option value={null}>Select type</option>
      {coffeeOptions.map((option, optionIndex)=>{
        return(
          <option value={option.name} key={optionIndex}>
            {option.name} ({option.caffeine}mg)
          </option>
        )
      })}
    </select >)}
    <h4>Add the cost ($)</h4>
    <input type="number" placeholder="4.50" className="w-full" value={coffeeCost} onChange={(e)=>{setCoffeeCost(e.target.value)}}/>
    <h4>Time since consumption</h4>
    <div className="time-entry">
      <div>
        <h6>Hours</h6>
        <select id="hours-select" onChange={(e)=>{setHour(e.target.value)}}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((hour, hourIndex)=> {
            return(
              <option value={hour} key={hourIndex}>{hour}</option>
            )
          })}
        </select>
      </div>
      <div>
        <h6>Mins</h6>
        <select id="mins-select" onChange={(e)=>{setMin(e.target.value)}}>
          {[0, 5, 10, 15, 30, 45].map((min, minIndex)=> {
            return(
              <option value={min} key={minIndex}>{min}</option>
            )
          })}
        </select>
      </div>
    </div>
    <button onClick={()=> handleSubmitForm()}>Add Entry</button>
    
    </>
  )
}