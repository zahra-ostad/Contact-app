import Header from "./components/Header"
import Contacts from "./components/Contacts"
import { useEffect, useState } from "react"
function App() {

  const [search,setSearch]=useState("")
  const [contacts,setContacts]=useState(()=>{
    return JSON.parse(localStorage.getItem("contacts")) || []
  })
  const[error,setError]=useState({name:"",email:"",alert:""})


  const searchHandler=()=>{
    console.log(search)
    const filterData=contacts.filter(item=>item.name.toLowerCase().includes(search.toLowerCase().trim()) || item.email.toLowerCase().includes(search.toLowerCase().trim()))
    setContacts(filterData)
  }
  const deleteAllHandler=()=>{
    if(contacts.length){
      setContacts([])
      setError(error=>({...error,alert:"All Contacts Deleted successfully!"}))
    }else{
      setError(error=>({...error,alert:"No contacts to delete !"}))
    }
  }
  return (
    <div >
    <Header  setSearch={setSearch} search={search} deleteAllHandler={deleteAllHandler} searchHandler={searchHandler}/>
    <Contacts  contacts={contacts} setContacts={setContacts} error={error} setError={setError}/>
    </div>
  )
}

export default App
