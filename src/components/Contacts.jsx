import { useState } from "react"
import inputs from "../constants/inputs"
import {v4} from "uuid"
import ContactsList from "./ContactsList"
import styles from "./Contacts.module.css"



function Contacts() {
    const [contacts,setContacts]=useState([])
    const [contact,setContact]=useState({id:"",name:"",email:"",job:"",phone:""})
    const[error,setError]=useState({name:"",email:"",alert:""})


    const validateValue=(name,value)=>{
        let nameError=""
        let emailError=""
        if(name==="name"){
            value.trim() === ""?nameError="لطفا نام مخاطب رو وارد کنید": value.length< 7 ? nameError ="نام حداقل 7 کارکتر باشد":setError({name:"",email:""})
        }
        if(name==="email"){
            value.trim()===""?emailError="لطفا ایمیل خود را وارد کنید":!/\S+@\S+\.\S+/.test(contact.email) ?emailError="لطفا ایمیل معتبر وارد  کنید":setError({name:"",email:""})
        }
        setError({name:nameError,email:emailError})
    }



const changeHandler=(e)=>{
    const name=e.target.name
    const value=e.target.value
    setContact(contact=>({...contact,[name]:value}))
    validateValue(name,value)
}

const addHandler=()=>{
    if(!contact.name || !contact.email){
        setError(error=>({...error,alert:"Please enter valid data!"}))
        return;
    }
    setError({name:"",email:"",alert:""})
    const newContact={...contact,id:v4()}
    setContacts(contacts=>([...contacts,newContact]))
    setContact({name:"",email:"",job:"",phone:""})
}
const deleteHandler=(id)=>{
    const newContacts=contacts.filter(contact=>contact.id !==id)
    setContacts(newContacts)
}
  return (
    <div className={styles.container}>
        <div className={styles.form}>
     {
     inputs.map((input,index)=>(<input key={index} type={input.type} placeholder={input.placeholder} name={input.name} onChange={changeHandler} value={contact[input.name]}/>))
    }
     {error.name&&<p>{error.name}</p>}
    {error.email&&<p>{error.email}</p>}
     <button onClick={addHandler}>Add Contact</button>
     <div className={styles.alert}>
     {error.alert&&<p>{error.alert}</p>}
    </div>
            
        </div>
        <ContactsList contacts={contacts} deleteHandler={deleteHandler}/>
    </div>
  )
}

export default Contacts