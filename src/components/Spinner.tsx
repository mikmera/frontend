import React from 'react'
import styles from './Spinner.module.css'

export const Spinner: React.FC = () => {
  return (
    <div className={styles.loader}>
      <div className={styles['loader-inner']}>
        <div className={styles['loader-line-wrap']}>
          <div className={styles['loader-line']}></div>
        </div>
        <div className={styles['loader-line-wrap']}>
          <div className={styles['loader-line']}></div>
        </div>
        <div className={styles['loader-line-wrap']}>
          <div className={styles['loader-line']}></div>
        </div>
        <div className={styles['loader-line-wrap']}>
          <div className={styles['loader-line']}></div>
        </div>
        <div className={styles['loader-line-wrap']}>
          <div className={styles['loader-line']}></div>
        </div>
      </div>
    </div>
  )
}
