import Link from 'next/link'
import styles from './index.module.css'

const LandingContent = () => {
  return (
    <div
      className={
        styles.container +
        ' d-flex flex-column flex-md-row justify-content-md-between'
      }
    >
      <div className={styles.leftContainer + ' ps-5'}>
        <h1 className={styles.title + ' mb-4'}>
          Capture Insights or Get Rewards
        </h1>
        <h3 className={styles.subtitle + ' mb-5'}>
          Join with our Survey Collaboration Platform
        </h3>
        <Link href="/register">
          <a className={styles.btn}>Register Now</a>
        </Link>
      </div>
      <div className={styles.rightContainer}>
        <img src="/landing-icon.svg" alt="landing icon" />
      </div>
    </div>
  )
}

export default LandingContent
