import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Chat from './pages/Chat'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import AddPost from './pages/AddPost'

import RequireAuth from './components/RequireAuth'
import AlertModel from './components/AlertModel'
import AuthProvider from './context/AuthProvider'

const App = () => {
  return (
    <>
      <AlertModel />
      <Routes>
        {/* public routes */}
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        {/* privat routes */}
        <Route element={<AuthProvider><RequireAuth /></AuthProvider>}>
          <Route path='/' element={<Home />} />
          <Route path='/chat/:roomID' element={<Chat />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/:userID' element={<Profile />} />
          <Route path='/add-post' element={<AddPost />} />
        </Route>
      </Routes>
    </>
  )
}

export default App