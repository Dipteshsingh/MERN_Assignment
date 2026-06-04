import React from 'react'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Agents from './pages/Agents'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Upload from './pages/Upload'

const App = () => {
  return (
    <div>
      <ProtectedRoute>
        <Navbar />
      </ProtectedRoute>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route
          path='dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        <Route
          path='agents'
          element={
            <ProtectedRoute>
              <Agents />
            </ProtectedRoute>
          } />
        <Route
          path='upload'
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          } />
      </Routes>
    </div>
  )
}

export default App