import styles from "./Header.module.css"
function Header() {
  return (
    <div className={styles.container}>
        <h1>Contact App</h1>
        <div className={styles.search}>
            <label >Search :</label>
            <input type="text" />
        </div>
    </div>
  )
}

export default Header