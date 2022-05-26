import styles from './index.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import Hamburger, { Cross } from 'hamburger-react'

const urls = [
  {
    name: 'Product',
    url: '/product',
  },
  {
    name: 'About',
    url: '/about',
  },
  {
    name: 'Contact',
    url: '/contact',
  },
  {
    name: 'Login',
    url: '/login',
    diff: true,
  },
]

const Navbar = () => {
  // const bigScreen = useMediaQuery('(min-width: 768px)')
  const [openSidebar, setOpenSidebar] = useState(false)

  const Sidebar = () => {
    return (
      <div className={styles.sidebar + ' position-fixed'}>
        <div className={styles.topSidebar}>
          <Cross toggled={true} toggle={() => setOpenSidebar(false)} />
        </div>
        <div
          className={
            styles.contentSidebar +
            ' d-flex flex-column align-items-center mt-3'
          }
        >
          {urls.map((url) => {
            return (
              <Link href={url.url} key={url.name}>
                <a
                  className={
                    styles.link + ' d-block my-2 ' + styles.linkSidebar
                  }
                >
                  {url.name}
                </a>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div
      className={
        styles.container +
        ' d-flex justify-content-between pt-0 pe-2 pt-md-4 ps-md-4 pe-md-5'
      }
    >
      <div className={styles.leftContainer}>
        <Image src="/logo.png" alt="logo" width={180} height={60} />
      </div>
      <div
        className={
          styles.rightContainer + ' d-flex align-items-center d-md-block'
        }
      >
        <div
          className={
            styles.bigScreenUrls + ' d-none d-md-flex align-items-center h-100'
          }
        >
          {urls.map((url) => {
            return (
              <Link href={url.url} key={url.name}>
                <a
                  className={
                    (url.diff ? styles.linkDiff : styles.link) + ' d-block'
                  }
                >
                  {url.name}
                </a>
              </Link>
            )
          })}
        </div>

        <div className="d-block d-md-none">
          <Hamburger
            color="#fff"
            toggled={false}
            toggle={() => setOpenSidebar(true)}
          />
          {openSidebar && <Sidebar />}
        </div>
      </div>
    </div>
  )
}

export default Navbar
