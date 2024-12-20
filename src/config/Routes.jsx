import React from 'react'
import { Route, Routes } from 'react-router'
import App from '../App'
import ChatPage from '../pages/ChatPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/chat" element={<ChatPage/>} />
      <Route path="/about" element={<h1>About page hainge</h1>} />
      <Route path="*" element={<h1>404 error bagustunnni</h1>} />
     </Routes>
  )
}

export default AppRoutes