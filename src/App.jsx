import Layout from "./component/Layout"
import Hero from "./component/Hero"
import CoffeeForm from "./component/CoffeeForm"
import Stats from "./component/Stats"
import History from "./component/History"
import { useAuth } from "./context/AuthContext"
function App() {
  
  const { globalUser, isLoading ,globalData } = useAuth()
  const isAuthenticated = globalUser //First there was just true/false, now if there is a globalUser we are authenticated else not
  const isData = globalData && !!Object.keys(globalData || {}).length //If there is data and also the keys to the object of the data should be greater than 0 means that is data will be truthy
  const authenticatedContent = (
    <>
    <Stats/>
    <History/>
    </>
  )

  return (
    <Layout>
      <Hero />
      <CoffeeForm isAuthenticated={isAuthenticated}/>
      {(isAuthenticated && isLoading) && (
        <p>Loading data...</p>
      )}
      {(isAuthenticated && isData) && (authenticatedContent)} {/**This is a condition to render the Stats and History only when isAuthenticated is "true" */}
      </Layout> 
  )
}

export default App
