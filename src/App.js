import React from 'react'
import { BrowserRouter,Route,Routes,Navigate } from 'react-router-dom'
import Auth from './Page/Auth'
function App() {
  return (
<div className='app'>
 <BrowserRouter>
 <Routes>
  <Route path='/' element={<Navigate to='/auth' replace/>} />
  <Route path='/auth' element={<Auth/>} />
 </Routes>
 </BrowserRouter>
</div>
  )
}

export default App