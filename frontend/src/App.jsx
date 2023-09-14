import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Chat from './pages/Chat'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import Post from './pages/Post'

import RequireAuth from './components/RequireAuth'
import AlertModel from './components/AlertModel'
import AuthProvider from './context/AuthProvider'

import AddPost from './components/posts/AddPost'
import UpdatePost from './components/posts/UpdatePost'
import Edit from './components/profile/Edit'
import ProfilePage from './components/profile/ProfilePage'

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
          <Route element={<Profile />}>
            <Route path='/profile/:userID' element={<ProfilePage />}/>
            <Route path='/profile' element={<ProfilePage />}/>
            <Route path='/profile/edit' element={<Edit />} />
          </Route>
          <Route element={<Post />}>
            <Route path='/post/add' element={<AddPost />} />
            <Route path='/post/:postID/update' element={<UpdatePost />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App