import { Route, Routes } from 'react-router-dom'
import HomePage from './Page/Home/HomePage.js'
import ResetPassword from './components/LoginForm/ResetPassword';
import DetailPage from './Page/DetailPage/index.js';
import AddProductForm from './Page/PageDangTin/index.js';
import LoginPage from './Page/Login/index.js';
import RegisterPage from './Page/Register/index.js';
import ProfilePage from './Page/UserProfile/Profile.js';
function App() {
  

  return (
    <>
      <Routes>
      <Route path="/*" element={<HomePage />} />
      <Route path="/add-product" element={<AddProductForm />} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path="/reset-password" element={<ResetPassword/>} />
      <Route path="/product/:id" element={<DetailPage />} />
      <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
    </>
  )
}

export default App
