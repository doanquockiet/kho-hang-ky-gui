import { Route, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm/LoginForm.js'
import HomePage from './Page/Home/HomePage.js'
import ResetPassword from './components/LoginForm/ResetPassword';
function App() {
  

  return (
    <>
      <Routes>
      <Route path="/*" element={<HomePage />} />
      <Route path="/login" element={<LoginForm/>} />
      <Route path="/reset-password" element={<ResetPassword/>} />
      </Routes>
    </>
  )
}

export default App
