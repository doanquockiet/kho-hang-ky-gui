import { Route, Routes } from 'react-router-dom'

import HomePage from './Page/Home/HomePage.js'

function App() {
  

  return (
    <>
      <Routes>
      <Route path="/*" element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
