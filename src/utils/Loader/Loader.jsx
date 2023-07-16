import React from 'react'
import styles from "./Loader.module.css"

const Loader = () => {
  return (
    <>
         <div className={styles.interactly_loader_container}>
                        <div className={styles.ring}>
                            Loading...
                            <span></span>
                        </div>
                    </div>
    </>
  )
}

export default Loader