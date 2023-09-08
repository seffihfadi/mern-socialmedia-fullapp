import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"

import Nav from '../components/Nav'
import Backdrop from '../components/Backdrop'
import { Suspense } from "react"

const RequireAuth = () => {
  const user = useAuth()
  //console.log('user', user)
  return (
    !!user 
    &&
    <Suspense fallback={<div>loading...</div>}>
      <Backdrop />
      <Nav />
      <main>
        <Outlet />
      </main>
    </Suspense>
    // : 
    // <Navigate to='/signin' replace={true} />
  )
}

export default RequireAuth