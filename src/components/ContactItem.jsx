import styles from "./ContactItem.module.css"
function contactItem({data:{id,name,email,job,phone},deleteHandler}) {

  return (
    <li className={styles.item}>
    <p>{name}</p>
    <p><span>📫</span>{email}</p>
    <p><span>📞</span>{phone}</p>
    <button onClick={()=>deleteHandler(id)}>🗑</button>
</li>
  )
}

export default contactItem