import { Route, Routes } from 'react-router-dom'
import LogIn from './pages/Login.jsx'
import Home from './pages/home.jsx'
import NotFound from './pages/NotFound.jsx'
import AuthRedirect from './pages/authRedirect.jsx'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/*' element={<Home />} />
        <Route path='/login' element={<AuthRedirect><LogIn /></AuthRedirect>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App