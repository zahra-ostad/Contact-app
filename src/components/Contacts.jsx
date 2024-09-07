import { useEffect, useState } from "react"
import inputs from "../constants/inputs"
import {v4} from "uuid"
import ContactsList from "./ContactsList"
import styles from "./Contacts.module.css"



function Contacts({contacts,setContacts,error,setError}) {
    const [contact,setContact]=useState({id:"",name:"",email:"",job:"",phone:""})
    const [success,setSuccess]=useState("")
    const [edit,setEdit]=useState(false)
    const [selectedId,setSelectedId]=useState("")

    useEffect(()=>{
        window.localStorage.setItem("contacts",JSON.stringify(contacts))
    },[contacts])


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
    setSuccess("")
}

const addHandler=()=>{
    if(!contact.name || !contact.email){
        setError(error=>({...error,alert:"Please enter valid data!"}))
        setSuccess("")
        return;
    }
  
    const newContact={...contact,id:v4()}
    setContacts(contacts=>([...contacts,newContact]))
    setContact({name:"",email:"",job:"",phone:""})
    setError({name:"",email:"",alert:""})
    setSuccess("Contact added successfully !")
}
useEffect(()=>{
    if(error.alert || error.name || error.email || success){
        const timer=setTimeout(() => {
            setError({name:"",email:"",alert:""})
            setSuccess("")
        }, 2000);
        return ()=>clearTimeout(timer)
    }
},[error,success])

const deleteHandler=(id)=>{
    const newContacts=contacts.filter(contact=>contact.id !==id)
    setContacts(newContacts)
    setError(error=>({...error,alert:"Contact  Deleted successfully!"}))
}

const editHandler=id=>{
    const contactItem=contacts.find(contact=>contact.id === id)
    console.log(contactItem)
    setContact(contact=>({...contact,name:contactItem.name,email:contactItem.email,job:contactItem.job,phone:contactItem.phone}))
    setEdit(edit=>!edit)
    setSelectedId(selectedId=>id)
}

const applyEditHandler=(e)=>{
const updatedContacts=contacts.map(item=>item.id === selectedId ? {...item,...contact}:item)
setContacts(updatedContacts)
setContact({id:"",name:"",email:"",job:"",phone:""})
setEdit(edit=>!edit)
setSelectedId("")
setError({name:"",email:"",alert:""})
setSuccess("Contact edited successfully !")
}
  return (
    <div className={styles.container}>
        <div className={styles.form}>
     {
     inputs.map((input,index)=>(<input key={index} type={input.type} placeholder={input.placeholder} name={input.name} onChange={changeHandler} value={contact[input.name]}/>))
    }
    <div className={styles.alert}>
     {error.name&&<p>{error.name}</p>}
    {error.email&&<p>{error.email}</p>}
    </div>
    {edit?<button className={styles.edit} onClick={applyEditHandler} id={selectedId}>Edit Contact</button> :    <button onClick={addHandler}>Add Contact</button>}
     </div>
     <div className={styles.alert}>
     {error.alert&&<p>{error.alert}</p>}
     {success && <p style={{ color: 'green',backgroundColor:"rgb(149, 222, 205)" }}>{success}</p>}
    </div>

    <ContactsList contacts={contacts} deleteHandler={deleteHandler} editHandler={editHandler}/>

    </div>
  )
}

export default Contacts