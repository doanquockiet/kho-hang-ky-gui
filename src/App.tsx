import { Route, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm/LoginForm.js'
import HomePage from './Page/Home/HomePage.js'
import ResetPassword from './components/LoginForm/ResetPassword';
import DetailPage from './Page/DetailPage/index.js';
function App() {
  

  return (
    <>
      <Routes>
      <Route path="/*" element={<HomePage />} />
      <Route path="/login" element={<LoginForm/>} />
      <Route path="/reset-password" element={<ResetPassword/>} />
      <Route path="/product/:id" element={<DetailPage />} />
      </Routes>
    </>
  )
}

export default App
