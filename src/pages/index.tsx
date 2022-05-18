import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useQuery, gql } from '@apollo/client'
import Image from 'next/image'

import styles from '../styles/landing.module.css'
import { Navbar, LandingContent } from '../components'

export const exampleQuery = gql`
  query example {
    example {
      message
    }
  }
`

const Landing = () => {
  return (
    <div className={styles.landing + ' page d-flex flex-column'}>
      <Navbar />
      <div
        className={
          styles.contentContainer +
          ' d-flex flex-column justify-content-md-center justify-content-start mt-md-0 mt-5'
        }
      >
        <LandingContent />
      </div>
    </div>
  )
}

export default Landing

// const IndexPage = () => {
//   const { data: session, status } = useSession()
//   const loading = status === "loading"
//   const { data, loading: queryLoading, refetch } = useQuery(exampleQuery, { notifyOnNetworkStatusChange: true })
//   if (loading) {
//     return (
//       <div className="flex justify-center mt-8 text-center">
//         <div className="flex-auto">
//           <div className="text-lg mb-2">Loading...</div>
//         </div>
//       </div>
//     )
//   }

//   if (session) {
//     return (
//       <div className="flex justify-center mt-8 text-center">
//         <div className="flex-auto">
//           {session.user.image && (
//             <Image
//               // @ts-ignore
//               src={session.user.image}
//               // @ts-ignore
//               alt={session.user.email ?? session.user.name}
//               width="60"
//               height="60"
//               className="h-16 w-16 rounded-full mx-auto mb-2"
//             />
//           )}
//           <div className="text-lg mb-2">Hello, {session.user.email ?? session.user.name}</div>
//           <div className="mb-2">
//             gql test query: {queryLoading ? 'fetching...' : data?.example?.message}
//             <button className="btn-blue ml-2" onClick={() => refetch()}>
//               Refetch!
//             </button>
//           </div>
//           <button className="btn-green" onClick={() => signOut()}>
//             Sign out
//           </button>
//         </div>
//       </div>
//     )
//   } else {
//     return (
//       <div className="flex justify-center mt-8 text-center">
//         <div className="flex-auto">
//           <div className="text-lg mb-2">You are not logged in!</div>
//           <button className="btn-green" onClick={() => signIn()}>
//             Sign in
//           </button>
//         </div>
//       </div>
//     )
//   }
// }

// export default IndexPage
