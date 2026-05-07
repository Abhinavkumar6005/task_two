import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './Component/Header'
import Footer from './Component/Footer'
import Products from './pages/Products'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <Header/>
    <Routes>
      <Route path="/products" element={<Products/>} />
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
    <Footer/>
   </>
  )
}

export default App
