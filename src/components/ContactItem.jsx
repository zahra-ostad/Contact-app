import styles from "./ContactItem.module.css"
function contactItem({data:{id,name,email,phone},deleteHandler,editHandler}) {

  return (
    <li className={styles.item}>
    <p>{name}</p>
    <p><span>📫</span>{email}</p>
    <p><span>📞</span>{phone}</p>
    <button className={styles.edit} onClick={()=>editHandler(id)}>✏️</button>
    <button onClick={()=>deleteHandler(id)}>🗑</button>
</li>
  )
}

export default contactItem